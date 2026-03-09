const Order = require('../models/Order');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');

const createOrder = asyncHandler(async (req, res) => {
  const { products } = req.body;
  if (!products?.length) return res.status(400).json({ message: 'Le panier est vide.' });

  const enrichedProducts = await Promise.all(products.map(async (item) => {
    const product = await Product.findById(item.product);
    if (!product || product.stock < item.quantity) throw new Error(`Stock insuffisant pour ${item.product}`);
    product.stock -= item.quantity;
    await product.save();
    return { product: product._id, name: product.name, image: product.image, price: product.price, quantity: item.quantity };
  }));

  const totalPrice = enrichedProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = await Order.create({ user: req.user._id, products: enrichedProducts, totalPrice, status: 'pending' });

  res.status(201).json({ message: 'Commande créée.', order });
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ orders });
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email').populate('products.product', 'name image');
  if (!order) return res.status(404).json({ message: 'Commande introuvable.' });
  res.json({ order });
});

module.exports = { createOrder, getMyOrders, getOrderById };
