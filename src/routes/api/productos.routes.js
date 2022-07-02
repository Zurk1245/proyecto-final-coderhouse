const express = require("express");
const { isAdmin } = require("../../middlewares/middleware-functions.js");
const productosController = require("../../controllers/productos.controller");
                                                    
const router = express.Router();

router.post("/", isAdmin, productosController.addProductToCatalog);
router.get("/:id?", productosController.getProductsFromCatalog);
router.put("/:id", isAdmin, productosController.updateProduct);
router.delete("/:id", isAdmin, productosController.deleteProductFromCatalog);

module.exports = router;