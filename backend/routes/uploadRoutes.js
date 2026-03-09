const express = require('express');
const multer = require('multer');
const { uploadImage } = require('../controllers/uploadController');
const { storage } = require('../config/cloudinary');
const { adminOnly, protect } = require('../middleware/authMiddleware');

const router = express.Router();
const upload = multer({ storage });

router.post('/image', protect, adminOnly, upload.single('image'), uploadImage);

module.exports = router;
