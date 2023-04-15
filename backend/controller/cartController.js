const Cart = require("../model/cart.model");
const factory = require("./handlerFactory");

exports.setProductUserIds = (req, res, next) => {
  // nested routes
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getUsersCart = factory.getAll(Cart);
exports.addToCart = factory.createOne(Cart);
exports.updateCart = factory.updateOne(Cart);
exports.deleteCart = factory.deleteOne(Cart);
