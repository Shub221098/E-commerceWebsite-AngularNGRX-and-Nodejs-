const Cart = require("../model/cart.model");
const factory = require("./handlerFactory");
const catchAsync = require("../catchAsync");

// ******************************************** SET USER ID *****************************************
exports.setUserIds = (req, res, next) => {
  if (!req.body.user) req.body.userId = req.user.id;
  console.log(req.body.userId);
  next();
};
exports.updateCart = catchAsync(async (req, res) => {
  const updatedCart = await Cart.findOneAndUpdate(
    { userId: req.body.userId },
    { $set: { items: [] } },
    { new: true }
  );
  console.log(updatedCart)
});
exports.getUsersCart = catchAsync(async (req, res) => {
  const data = await Cart.findOne({ userId: req.params.userId });
  return res.json(data.items);
});

// **************************************** UPDATE QUANITY ON CART **********************************
exports.deleteQuantity = catchAsync(async (req, res) => {
  const updatedCart = await Cart.findOneAndUpdate(
    {
      "items.productId": req.params.id,
      userId: req.body.userId,
      "items.totalProductQuantity": { $gt: 1 },
    },
    { $inc: { "items.$.totalProductQuantity": -1 } },
    { new: true }
  );
});


// ****************************************** ADD QUANTITY ******************************************
exports.addQuantity = catchAsync(async (req, res) => {
  const updatedCart = await Cart.findOneAndUpdate(
    {
      "items.productId": req.params.id,
      userId: req.body.userId,
      "items.totalProductQuantity": { $lt: 10 },
    },
    { $inc: { "items.$.totalProductQuantity": +1 } },
    { new: true }
  );
});

// *************************************** REMOVE PRODUCT FROM CART ************************************
exports.removeProduct = catchAsync(async (req, res, next) => {
  const updatedCart = await Cart.findOneAndUpdate(
    {
      "items.productId": req.params.id,
      userId: req.body.userId,
    },
    { $pull: { items: { productId: req.params.id } } },
    { new: true }
  );
  if (updatedCart.items.length === 0) {
    res.status(200).json({
      status: "success",
      message: null,
    });
  }
});


// ************************************* PRODUCTS ADDED TO CART **************************************
exports.addToCart = catchAsync(async (req, res, next) => {
  let carts = await Cart.findOne({ userId: req.body.userId });
  let product = await Cart.findOneAndUpdate(
    { "items.productId": req.body.id, userId: req.body.userId },
    { $inc: { "items.$.totalProductQuantity": req.body.quantity } },
    { new: true }
  );
  if (product && carts) {
    res.status(200).json({
      status: "success",
      data: {
        data: carts,
      },
    });
  } else if (!product && carts) {
    let cart = {
      productId: req.body.id,
      productName: req.body.name,
      totalProductQuantity: req.body.quantity,
      totalProductPrice: req.body.price,
      totalProductDiscountPrice: req.body.discountPrice,
      totalAvailableStock: req.body.stock,
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
          totalAvailableStock: req.body.stock,
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
