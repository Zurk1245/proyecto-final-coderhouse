const express = require('express');
const router = express.Router();

const webRouter = require("./web/web.routes");
const authRouter = require("./web/auth.routes");
const productosRouter = require("./api/productos.routes");
const carritosRouter = require("./api/carritos.routes");

router.use("/productos", webRouter);
router.use("/auth", authRouter);
router.use("/api/productos", productosRouter);
router.use("/api/carrito", carritosRouter);

module.exports = router;