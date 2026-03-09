const Product = require('../models/Product');
const Review = require('../models/Review');
const asyncHandler = require('../utils/asyncHandler');

async function refreshProductRating(productId) {
  const reviews = await Review.find({ product: productId });
  const rating = reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;
  await Product.findByIdAndUpdate(productId, { rating, reviewsCount: reviews.length });
}

const createReview = asyncHandler(async (req, res) => {
  const review = await Review.create({
    user: req.user._id,
    product: req.params.productId,
    rating: req.body.rating,
    comment: req.body.comment
  });

  await refreshProductRating(req.params.productId);
  res.status(201).json({ message: 'Avis ajouté.', review });
});

const listReviewsByProduct = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name');
  res.json({ reviews });
});

module.exports = { createReview, listReviewsByProduct };
