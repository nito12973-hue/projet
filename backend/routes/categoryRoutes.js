const express = require('express');
const { body } = require('express-validator');
const { createCategory, deleteCategory, listCategories } = require('../controllers/categoryController');
const { adminOnly, protect } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.get('/', listCategories);
router.post('/', protect, adminOnly, [body('name').trim().notEmpty(), body('slug').trim().notEmpty()], validateRequest, createCategory);
router.delete('/:id', protect, adminOnly, deleteCategory);

module.exports = router;
