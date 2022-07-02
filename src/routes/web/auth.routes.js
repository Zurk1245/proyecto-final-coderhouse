const express = require("express");
const passport = require('passport');
const authController = require("../../controllers/auth.controller");

const router = express.Router();

// REGISTRO
router.get("/registro", authController.registerView);
router.post("/registro", passport.authenticate("registro", { failureRedirect: "/auth/registro/error" }), authController.registerVerify);
router.get("/registro/error", authController.registerError);

// LOGIN
router.get("/login", authController.loginView);
router.post("/login", passport.authenticate("login", { successRedirect: "/", failureRedirect: "/auth/login/error" }), authController.loginVerify);
router.get("/login/error", authController.loginError);

//LOGOUT
router.post("/logout", authController.logout);

module.exports = router;