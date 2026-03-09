const express = require('express');
const { body } = require('express-validator');
const { forgotPassword, login, logout, me, register, resetPassword, verifyEmail } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.post('/register', [body('name').trim().notEmpty(), body('email').isEmail().normalizeEmail(), body('password').isLength({ min: 8 })], validateRequest, register);
router.get('/verify-email/:token', verifyEmail);
router.post('/login', [body('email').isEmail(), body('password').notEmpty()], validateRequest, login);
router.post('/forgot-password', [body('email').isEmail()], validateRequest, forgotPassword);
router.post('/reset-password/:token', [body('password').isLength({ min: 8 })], validateRequest, resetPassword);
router.post('/logout', logout);
router.get('/me', protect, me);

module.exports = router;
