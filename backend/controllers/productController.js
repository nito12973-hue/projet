const Category = require('../models/Category');
const Product = require('../models/Product');
const Review = require('../models/Review');
const asyncHandler = require('../utils/asyncHandler');

const listProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 9);
  const search = req.query.search || '';
  const category = req.query.category;

  const query = {
    name: { $regex: search, $options: 'i' }
  };

  if (category) {
    const categoryDoc = await Category.findOne({ slug: category });
    query.category = categoryDoc?._id;
  }

  const [products, total] = await Promise.all([
    Product.find(query).populate('category').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Product.countDocuments(query)
  ]);

  res.json({
    products,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) }
  });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category');
  if (!product) return res.status(404).json({ message: 'Produit introuvable.' });

  const reviews = await Review.find({ product: product._id }).populate('user', 'name');
  res.json({ product, reviews });
});

const createProduct = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(404).json({ message: 'Catégorie introuvable.' });

  const product = await Product.create(req.body);
  res.status(201).json({ message: 'Produit créé.', product: await product.populate('category') });
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('category');
  if (!product) return res.status(404).json({ message: 'Produit introuvable.' });
  res.json({ message: 'Produit mis à jour.', product });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: 'Produit introuvable.' });
  res.json({ message: 'Produit supprimé.' });
});

module.exports = { listProducts, getProductById, createProduct, updateProduct, deleteProduct };
