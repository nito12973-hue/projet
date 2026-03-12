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
    totalSales: salesData[0]?.totalSales ?? 0,
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
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    User.countDocuments()
  ]);

  res.json({
    users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

const reviewUser = asyncHandler(async (req, res) => {
  const allowedStatuses = ['pending', 'approved', 'rejected'];
  const { approvalStatus } = req.body;

  if (!allowedStatuses.includes(approvalStatus)) {
    return res
      .status(400)
      .json({ message: 'Statut invalide. Utilisez pending, approved ou rejected.' });
  }

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'Utilisateur introuvable.' });

  user.approvalStatus = approvalStatus;
  await user.save();

  let emailWarning = null;
  if (approvalStatus === 'approved') {
    try {
      await sendApprovalWelcome(user);
    } catch (err) {
      emailWarning = "L'e-mail de bienvenue n'a pas pu être envoyé, l'approbation est néanmoins enregistrée.";
    }
  }

  res.json({ message: 'Statut utilisateur mis à jour.', user, emailWarning });
});

const getAllOrders = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);
  const skip = (page - 1) * limit;
  const includeDetails = String(req.query.details).toLowerCase() === 'true';

  const [orders, total] = await Promise.all([
    Order.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'name email'),
    Order.countDocuments()
  ]);

  res.json({
    orders: orders.map((order) => ({
      _id: order._id,
      customer: order.user?.name || 'Client',
      totalPrice: order.totalPrice,
      status: order.status,
      createdAt: order.createdAt,
      items: order.products.map((item) => item.name),
      paymentMethod: order.paymentMethod,
      ...(includeDetails
        ? {
            phone: order.phone,
            deliveryCity: order.deliveryCity,
            deliveryAddress: order.deliveryAddress
          }
        : {})
    })),
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

module.exports = { getDashboard, getAllUsers, reviewUser, getAllOrders };
