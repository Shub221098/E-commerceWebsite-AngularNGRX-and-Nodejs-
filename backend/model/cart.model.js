const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    items: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        totalProductQuantity: {
          type: Number,
          required: true,
        },
        totalProductPrice: {
          type: Number,
          required: true,
        },
        totalProductDiscountPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Cart must belong to a user"],
    },
  },
  { timestamps: true }
);
cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "items.product",
    select: "name stock price discountPrice",
  }).populate({
    path: "user",
    select: "name",
  });
  next();
});
module.exports = mongoose.model("Cart", cartSchema);
