const mongoose = require('mongoose');

const orderProductSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  image: String,
  price: Number,
  quantity: { type: Number, default: 1 }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [orderProductSchema],
  totalPrice: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['pending', 'paid', 'processing', 'shipped', 'cancelled'], default: 'pending' },
  phone: { type: String, required: true, trim: true },
  deliveryCity: { type: String, required: true, trim: true },
  deliveryAddress: { type: String, required: true, trim: true },
  paymentMethod: {
    type: String,
    enum: ['cash_on_delivery', 'wave', 'orange_money', 'free_money'],
    default: 'cash_on_delivery'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
