const Cart = require("../model/cart.model");
const factory = require("./handlerFactory");
const catchAsync = require("../catchAsync");
exports.setProductUserIds = (req, res, next) => {
  if (!req.body.user) req.body.userId = req.user.id;
  console.log(req.body.userId);
  next();
};

exports.getUsersCart = factory.getAll(Cart);
exports.updateCart = factory.updateOne(Cart);
exports.deleteCart = factory.deleteOne(Cart);

exports.addToCart = catchAsync(async (req, res) => {
  cart = {
    items: [
      {
        productId: req.body.id,
        productName: req.body.name,
        totalProductQuantity: quantity,
        totalProductPrice: totalProductPrice,
        totalProductDiscountPrice: totalProductDiscountPrice,
      },
    ],
    userId: req.body.userId,
  };
  const doc = await Cart.create(cart);
  console.log(doc);
  res.status(201).json({
    status: "success",
    message: "Item Added to Cart successfully",
    doc
  });
});
