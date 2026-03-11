const crypto = require('crypto');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const { getApprovalTemplate, getResetTemplate, getVerificationTemplate } = require('../utils/emailTemplates');
const sendEmail = require('../utils/sendEmail');
const { getCookieOptions, setAuthCookie, signToken } = require('../utils/token');

const buildUserResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  verified: user.verified,
  approvalStatus: user.approvalStatus
});

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Un compte existe déjà avec cet email.' });

  const verificationToken = crypto.randomBytes(24).toString('hex');
  const user = await User.create({ name, email, password, verificationToken });

  const verificationLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;
  await sendEmail({ to: user.email, ...getVerificationTemplate(verificationLink, user.name) });

  res.status(201).json({
    message: 'Compte créé. Vérifie ton email puis attends la validation administrateur.',
    user: buildUserResponse(user)
  });
});

const verifyEmail = asyncHandler(async (req, res) => {
  const user = await User.findOne({ verificationToken: req.params.token });
  if (!user) return res.status(400).json({ message: 'Token de vérification invalide.' });

  user.verified = true;
  user.verificationToken = undefined;
  await user.save();

  res.json({ message: 'Email confirmé. Le compte attend maintenant la validation administrateur.' });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Identifiants invalides.' });
  }
  if (!user.verified) return res.status(403).json({ message: 'Confirme ton email avant de te connecter.' });
  if (user.approvalStatus !== 'approved') return res.status(403).json({ message: 'Compte en attente de validation administrateur.' });

  const token = signToken(user);
  setAuthCookie(res, token);

  res.json({ message: 'Connexion réussie.', token, user: buildUserResponse(user) });
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token', getCookieOptions());
  res.json({ message: 'Déconnexion réussie.' });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.json({ message: 'Si cet email existe, un message a été envoyé.' });

  const resetToken = crypto.randomBytes(24).toString('hex');
  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetPasswordExpires = Date.now() + 1000 * 60 * 30;
  await user.save();

  const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  await sendEmail({ to: user.email, ...getResetTemplate(resetLink, user.name) });
  res.json({ message: 'Email de réinitialisation envoyé.' });
});

const resetPassword = asyncHandler(async (req, res) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) return res.status(400).json({ message: 'Token invalide ou expiré.' });

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: 'Mot de passe mis à jour.' });
});

const me = asyncHandler(async (req, res) => {
  res.json({ user: buildUserResponse(req.user) });
});

const sendApprovalWelcome = async (user) => {
  await sendEmail({ to: user.email, ...getApprovalTemplate(user.name) });
};

module.exports = { register, verifyEmail, login, logout, forgotPassword, resetPassword, me, sendApprovalWelcome };
