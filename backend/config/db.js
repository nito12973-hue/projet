const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('La variable MONGODB_URI est obligatoire.');
  await mongoose.connect(uri);
  console.log('MongoDB connecté avec succès.');
}

module.exports = connectDB;
