const express = require("express");
const carritosController = require("../../controllers/carritos.controller");
                                                    
const router = express.Router();

router.post("/", carritosController.createCarrito);
router.delete("/:id", carritosController.deleteCarrito);
router.post("/:id/productos", carritosController.addProductToCarrito);
router.get("/:id/productos", carritosController.getProductsFromCarrito);
router.delete("/:id/productos/:id_prod", carritosController.deleteProductFromCarrito);

module.exports = router;