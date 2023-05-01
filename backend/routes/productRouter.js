const express = require("express");
const router = express.Router({ mergeParams: true });
const productController = require("../controller/productController");
const authController = require("../controller/authController");
const reviewRouter = require("./reviewRouter");

router.get('/images/:id', productController.getImages)
//User and Admin both access All Products
// Admin can add Product
console.log("Update");
router.get("/search", productController.searchProducts);
router
  .route("/")
  .get(productController.getAllProducts)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    productController.uploadUserPhoto,
    productController.resizeUserPhoto,
    productController.createProduct
  );

// get product categories
router.get("/categories", productController.getProductCategories);

// get products by categoryName
router.get(
  "/categories/:categoryName",
  productController.getProductByCategoryName
);

// User and Admin can get any product details and Search any Product
// Admin can Update product
// Admin can Delete product
router
  .route("/:id")
  .get(productController.getProduct)

  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    productController.deleteProduct
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    productController.uploadUserPhoto,
    productController.resizeUserPhoto,
    productController.updateProduct
  );

module.exports = router;
