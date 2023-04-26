const express = require("express");
const cartController = require("./../controller/cartController");
const authController = require("./../controller/authController");
const router = express.Router({ mergeParams: true });
//POST/users/124fdsfg4/carts


router.use(authController.protect, authController.restrictTo("user"));
router
  .route("/")
  .get(cartController.getUsersCart)
  .post(cartController.setProductUserIds, cartController.addToCart)
  .patch(cartController.setProductUserIds, cartController.updateCart)
router
  .route("/:id")
router.patch('/deleteQuantity/:id', cartController.setProductUserIds, cartController.deleteQuantity)
router.patch('/addQuantity/:id', cartController.setProductUserIds, cartController.addQuantity)
router.patch('/removeProduct/:id', cartController.setProductUserIds, cartController.removeProduct)
module.exports = router;
