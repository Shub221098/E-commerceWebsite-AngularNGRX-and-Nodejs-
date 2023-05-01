const express = require("express");
const orderController = require("./../controller/orderController");
const authController = require("./../controller/authController");
const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router
  .route("/getMostSellUsers")
  .get(authController.restrictTo("admin"), orderController.getMostSellUser);
router
  .route("/getProductHaveMostSell")
  .get(
    authController.restrictTo("admin"),
    orderController.getProductsHaveMostSell
  );
  router
  .route("/getTotalOrders")
  .get(authController.restrictTo("admin"), orderController.getTotalOrders);
// Admin Routes Only
router
  .route("/getDailyIncome")
  .get(authController.restrictTo("admin"), orderController.getDailyIncome);

router.get(
  "/getMonthlyIncome",
  authController.restrictTo("admin"),
  orderController.getMonthlyIncome
);
router.get(
  "/getYearlyIncome",
  authController.restrictTo("admin"),
  orderController.getYearlyIncome
);

router
  .route("/")
  .get(authController.restrictTo("admin"), orderController.getAllOrder)
  .post(
    authController.restrictTo("user"),
    orderController.setProductUserIds,
    orderController.createOrder
  );
router
  .route("/:id")
  .get(authController.restrictTo("user"), orderController.getOrder)
  .delete(authController.restrictTo("user"), orderController.cancelOrder);

module.exports = router;
