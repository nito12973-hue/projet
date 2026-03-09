const Product = require('../models/Product');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('favorites');
  res.json({ user });
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.name = req.body.name || user.name;
  if (req.body.password) user.password = req.body.password;
  await user.save();
  res.json({ message: 'Profil mis à jour.' });
});

const toggleFavorite = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (!product) return res.status(404).json({ message: 'Produit introuvable.' });

  const user = await User.findById(req.user._id);
  const exists = user.favorites.some((favorite) => favorite.toString() === product._id.toString());
  user.favorites = exists ? user.favorites.filter((favorite) => favorite.toString() !== product._id.toString()) : [...user.favorites, product._id];
  await user.save();

  res.json({ message: exists ? 'Favori retiré.' : 'Favori ajouté.', favorites: user.favorites });
});

const getFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('favorites');
  res.json({ favorites: user.favorites });
});

module.exports = { getProfile, updateProfile, toggleFavorite, getFavorites };
