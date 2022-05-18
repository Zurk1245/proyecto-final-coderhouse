const express = require("express");
const logger = require("../winston-logger");
const carritoDao = process.env.DB == "mongodb" ? require("../daos/carritos/carritos-dao-mongodb") : 
                    process.env.DB == "archivo" ? require("../daos/carritos/carritos-dao-archivo") : 
                                                    require("../daos/carritos/carritos-dao-firebase");
                                                    
const carrito = express.Router();

carrito.post("/", async (req, res) => {
    //Crea un carrito y devuelve su id.
    try {
        const result = await carritoDao.save();
        res.send(result);
    } catch (error) {
        logger.error(error);
    }
});

carrito.delete("/:id", async (req, res) => {
    //Vacía un carrito y lo elimina
    try {
        const result = await carritoDao.deleteById(req.params.id);
        res.send(result);   
    } catch (error) {
        logger.error(error);
    }
});

carrito.post("/:id/productos", async (req, res) => {
    //Para incorporar productos al carrito por su id de producto en el body
    try {
        const idCarrito = req.params.id;
        const idProducto = req.body.id;
        const cantidadDeUnidades = req.body.cantidad;
        const result = await carritoDao.addProductToCarritoById(idCarrito, idProducto, cantidadDeUnidades);
        res.send(result);   
    } catch (error) {
        logger.error(error);
    }
});

carrito.get("/:id/productos", async (req, res) => {
    //Me permite listar todos los productos guardados en un carrito
    try {
        const productosCarrito = await carritoDao.getProductsByCarritoId(req.params.id);
        res.send(productosCarrito);   
    } catch (error) {
        logger.error(error);
    }
});

carrito.delete("/:id/productos/:id_prod", async (req, res) => {
    // Eliminar un producto del carrito por su id de carrito y de producto
    try {
        const idCarrito = req.params.id;
        const idProducto = req.params.id_prod;
        const result = await carritoDao.deleteProductFromCarritoByIds(idCarrito, idProducto);
        res.send(result);
    } catch (error) {
        logger.error(error);
    }
});

module.exports = carrito;