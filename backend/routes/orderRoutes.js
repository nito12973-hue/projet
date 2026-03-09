const express = require('express');
const { body } = require('express-validator');
const { createOrder, getMyOrders, getOrderById } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.use(protect);
router.get('/mine', getMyOrders);
router.get('/:id', getOrderById);
router.post('/', [body('products').isArray({ min: 1 })], validateRequest, createOrder);

module.exports = router;
