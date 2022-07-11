const express = require("express");
const { isLogged } = require("../../middlewares/middleware-functions");
const webController = require("../../controllers/web.controller");

const router = express.Router();

router.get("/", isLogged, webController.homePage);
router.post("/pedido", webController.pedido);
router.get("/:categoria", webController.categoryPage);
//BUSCAR POR UNA FUNCIÓN DE JS EN EL FRONT Q ES MÁS SENCILLO. VER EJEMPLO USADO EN EL OTRO BOTON DEL FRONT

module.exports = router;