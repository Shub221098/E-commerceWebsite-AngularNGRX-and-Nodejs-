const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  items: Array,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
    required : true,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  shippingAddress: {
    address: {
      type: String,
      default: "Near Bank of Baroda",
    },
    city: { type: String, default: "Kota" },
    postalCode: { type: String, default: "256398" },
    country: { type: String, default: "India" },
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
    default: "9602650160",
  },
  email: {
    type: String,
    required: [true, "Email Is Required"],
  },
  status: {
    type: String,
    default: "Not Processed",
    enum: ["Not Processed", "Processing", "Shipped", "Delivered", "Cancelled"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Order", orderSchema);
