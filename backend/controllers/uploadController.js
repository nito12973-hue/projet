const asyncHandler = require('../utils/asyncHandler');

const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Aucun fichier reçu.' });
  res.status(201).json({ message: 'Image téléversée.', imageUrl: req.file.path });
});

module.exports = { uploadImage };
