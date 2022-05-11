const express = require("express");

const registro = express.Router();

registro.get("/", (req, res) => {
    res.send();
});

module.exports = registro;