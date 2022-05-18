const express = require("express");
const passport = require('passport');
const login = express.Router();

login.get("/", (req, res) => {
    let url;
    if (req.headers.host.includes("localhost")) {
        url = "http://localhost:8080";
    } else {
        url = "http://entregable-coder.herokuapp.com";
    }
    res.render("login", { url });
});

login.post("/", passport.authenticate("login", { successRedirect: "/", failureRedirect: "/login/error" }), (req, res) => {
    res.redirect(`/home`);
});

login.get("/error", (req, res) => {
    res.render("error-login");
});

module.exports = login;