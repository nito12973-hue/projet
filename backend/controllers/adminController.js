const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const { sendApprovalWelcome } = require('./authController');

const getDashboard = asyncHandler(async (req, res) => {
  const [totalUsers, totalProducts, totalOrders, salesData, recentOrders] = await Promise.all([
    User.countDocuments(),
    Product.countDocuments(),
    Order.countDocuments(),
    Order.aggregate([{ $group: { _id: null, totalSales: { $sum: '$totalPrice' } } }]),
    Order.find().sort({ createdAt: -1 }).limit(5).populate('user', 'name')
  ]);

  res.json({
    totalUsers,
    totalProducts,
    totalOrders,
    totalSales: salesData[0]?.totalSales || 0,
    recentOrders: recentOrders.map((order) => ({
      _id: order._id,
      customer: order.user?.name || 'Client',
      totalPrice: order.totalPrice,
      status: order.status,
      createdAt: order.createdAt
    }))
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json({ users });
});

const reviewUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'Utilisateur introuvable.' });

  user.approvalStatus = req.body.approvalStatus;
  await user.save();
  if (req.body.approvalStatus === 'approved') await sendApprovalWelcome(user);

  res.json({ message: 'Statut utilisateur mis à jour.', user });
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 }).populate('user', 'name email');
  res.json({
    orders: orders.map((order) => ({
      _id: order._id,
      customer: order.user?.name || 'Client',
      totalPrice: order.totalPrice,
      status: order.status,
      createdAt: order.createdAt,
      items: order.products.map((item) => item.name)
    }))
  });
});

module.exports = { getDashboard, getAllUsers, reviewUser, getAllOrders };
