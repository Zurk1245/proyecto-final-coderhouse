const express = require("express");

const login = express.Router();

login.get("/", (req, res) => {
    res.send();
});

module.exports = login;