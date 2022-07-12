const express = require("express");
const authController = require("../../controllers/auth.controller");

const router = express.Router();

// REGISTRO
router.get("/registro", authController.registerView);
router.post("/registro", authController.registerVerify);
router.get("/registro/error", authController.registerError);

// LOGIN
router.get("/login", authController.loginView);
router.post("/login", authController.loginVerify);
router.get("/login/error", authController.loginError);

//LOGOUT
router.post("/logout", authController.logout);

module.exports = router;