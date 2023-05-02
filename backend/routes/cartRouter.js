const express = require("express");
const cartController = require("./../controller/cartController");
const authController = require("./../controller/authController");
const router = express.Router({ mergeParams: true });
//POST/users/124fdsfg4/carts


router.use(authController.protect, authController.restrictTo("user"));
router
  .route("/")
  .get(cartController.getUsersCart)
  .post(cartController.setUserIds, cartController.addToCart)
  .patch(cartController.setUserIds, cartController.updateCart)
router
  .route("/:id")
router.patch('/deleteQuantity/:id', cartController.setUserIds, cartController.deleteQuantity)
router.patch('/addQuantity/:id', cartController.setUserIds, cartController.addQuantity)
router.patch('/removeProduct/:id', cartController.setUserIds, cartController.removeProduct)
module.exports = router;
