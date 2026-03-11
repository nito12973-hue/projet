const jwt = require('jsonwebtoken');

function signToken(user) {
  return jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
}

function getCookieOptions() {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/'
  };
}

function setAuthCookie(res, token) {
  res.cookie('token', token, {
    ...getCookieOptions(),
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}

module.exports = { signToken, setAuthCookie, getCookieOptions };
