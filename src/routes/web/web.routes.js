const express = require("express");
const { isLogged } = require("../../middlewares/middleware-functions");
const webController = require("../../controllers/web.controller");

const router = express.Router();

router.get("/", isLogged, webController.homePage);
router.post("/pedido", webController.pedido);
router.get("/:categoria", webController.categoryPage);

module.exports = router;