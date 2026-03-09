const express = require('express');
const { body } = require('express-validator');
const { createReview, listReviewsByProduct } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router({ mergeParams: true });

router.get('/', listReviewsByProduct);
router.post('/', protect, [body('rating').isFloat({ min: 1, max: 5 }), body('comment').trim().notEmpty()], validateRequest, createReview);

module.exports = router;
