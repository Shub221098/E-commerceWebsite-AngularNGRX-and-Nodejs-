const express = require("express");
const router = express.Router();
const userController = require('../controller/userController');
const authController = require("../controller/authController");
const cartRouter = require('./cartRouter');
router.use('/:userId/carts', cartRouter);
// Routes
router.post("/signup", authController.signup);
router.post("/verify-account", authController.verifyEmail);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/reset-password", authController.resetPassword);

//Protect all routes after this middleware
router.use(authController.protect);
router.patch("/updatePassword", authController.updatePassword);

router.use(authController.restrictTo("admin"));

router.route("/").get(userController.getAllUsers);

router.patch("/toggleActive/:id", userController.activeDeactiveAccount);

router.get("/:id", userController.getUser);

module.exports = router;
