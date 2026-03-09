const express = require('express');
const { body } = require('express-validator');
const { createProduct, deleteProduct, getProductById, listProducts, updateProduct } = require('../controllers/productController');
const { adminOnly, protect } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.get('/', listProducts);
router.get('/:id', getProductById);
router.post('/', protect, adminOnly, [body('name').trim().notEmpty(), body('description').trim().notEmpty(), body('price').isFloat({ min: 0 }), body('image').isString(), body('category').notEmpty(), body('stock').isInt({ min: 0 })], validateRequest, createProduct);
router.put('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

module.exports = router;
