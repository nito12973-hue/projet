const express = require('express');
const { body } = require('express-validator');
const { createOrder, getMyOrders, getOrderById } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.use(protect);
router.get('/mine', getMyOrders);
router.get('/:id', getOrderById);
router.post('/', [
  body('products').isArray({ min: 1 }),
  body('phone').trim().notEmpty().withMessage('Le téléphone est requis.'),
  body('deliveryCity').trim().notEmpty().withMessage('La ville de livraison est requise.'),
  body('deliveryAddress').trim().notEmpty().withMessage('L’adresse de livraison est requise.'),
  body('paymentMethod').isIn(['cash_on_delivery', 'wave', 'orange_money', 'free_money']).withMessage('Mode de paiement invalide.')
], validateRequest, createOrder);

module.exports = router;
