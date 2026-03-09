const express = require('express');
const { body } = require('express-validator');
const { getFavorites, getProfile, toggleFavorite, updateProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.use(protect);
router.get('/profile', getProfile);
router.put('/profile', [body('name').optional().trim().notEmpty(), body('password').optional().isLength({ min: 8 })], validateRequest, updateProfile);
router.get('/favorites', getFavorites);
router.post('/favorites/:productId', toggleFavorite);

module.exports = router;
