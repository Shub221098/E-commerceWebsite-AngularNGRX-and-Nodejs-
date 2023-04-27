const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  items: Array,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "users",
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
  totalItems: {
    type: Number,
    required: true,
  },
  totalQuantity: {
    type: Number,
    required: true,
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
