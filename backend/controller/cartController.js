const Cart = require("../model/cart.model");
const factory = require("./handlerFactory");
const catchAsync = require("../catchAsync");
exports.setProductUserIds = (req, res, next) => {
  if (!req.body.user) req.body.userId = req.user.id;
  console.log(req.body.userId);
  next();
};

exports.getUsersCart = factory.getAll(Cart);
exports.deleteCart = factory.deleteOne(Cart);

exports.addToCart = catchAsync(async (req, res, next) => {
  let carts = await Cart.findOne({ userId: req.body.userId });
  if (carts) {
    let cart = {
      productId: req.body.id,
      productName: req.body.name,
      totalProductQuantity: req.body.quantity,
      totalProductPrice: req.body.price,
      totalProductDiscountPrice: req.body.discountPrice,
      totalAvailableStock : req.body.stock
    };
    cartId = carts._id;
    carts.items.push(cart);
    const doc = await Cart.findByIdAndUpdate(cartId, carts, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError("No document found with that Id", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  } else {
    let cart = {
      items: [
        {
          productId: req.body.id,
          productName: req.body.name,
          totalProductQuantity: req.body.quantity,
          totalProductPrice: req.body.price,
          totalProductDiscountPrice: req.body.discountPrice,
          totalAvailableStock : req.body.stock
        },
      ],
      userId: req.body.userId,
    };
    const doc = await Cart.create(cart);
    console.log("reached Here");
    res.status(201).json({
      status: "success",
      message: "Item Added to Cart successfully",
      doc,
    });
  }
});
