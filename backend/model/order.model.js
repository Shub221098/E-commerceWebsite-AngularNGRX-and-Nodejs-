const mongoose = require('mongoose');
const orderSchema = mongoose.Schema(
  {
    items: Array,
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'users'
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false
    },
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true }
    },
    totalItems: {
      type: Number,
      required: true,
    },
    totalQuantity: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone Is Required']
    },
    email: {
      type: String,
      required: [true, 'Email Is Required']
    },
    status: {
      type: String,
      default: 'Not Processed',
      enum: ['Not Processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
    },
    createdAt: {
      type: Date,
      default: new Date()
    }
  },
);


module.exports = mongoose.model('Order', orderSchema);