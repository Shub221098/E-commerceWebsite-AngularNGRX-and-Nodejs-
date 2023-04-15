const User = require("../model/user.model");
const catchAsync = require("../catchAsync");
const factory = require("./handlerFactory");

exports.activeDeactiveAccount = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  user.active = !user.active;
  const user2 = await user.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    data: user2,
  });
});

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User, { path: "carts" });
