const express = require("express");
const cartController = require("./../controller/cartController");
const authController = require("./../controller/authController");
const router = express.Router({ mergeParams: true });
//POST/users/124fdsfg4/carts


router.use(authController.protect, authController.restrictTo("user"));
router
  .route("/")
  .get(cartController.getUsersCart)
  .post(cartController.setProductUserIds, cartController.addToCart);
router
  .route("/:id")
  .delete(cartController.deleteCart);
module.exports = router;
