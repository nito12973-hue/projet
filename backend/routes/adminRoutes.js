const express = require('express');
const { body } = require('express-validator');
const { getAllOrders, getAllUsers, getDashboard, reviewUser } = require('../controllers/adminController');
const { adminOnly, protect } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.use(protect, adminOnly);
router.get('/dashboard', getDashboard);
router.get('/users', getAllUsers);
router.patch('/users/:id/review', [body('approvalStatus').isIn(['approved', 'rejected', 'pending'])], validateRequest, reviewUser);
router.get('/orders', getAllOrders);

module.exports = router;
