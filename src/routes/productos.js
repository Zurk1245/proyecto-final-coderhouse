const express = require("express");
const { isAdmin } = require("../middleware-functions.js");
const logger = require("../winston-logger");
const productosDao = process.env.DB == "mongodb" ? require("../daos/productos/productos-dao-mongodb.js") :
                    process.env.DB ==  "archivo" ? require("../daos/productos/productos-dao-archivo") : 
                                                    require("../daos/productos/productos-dao-firebase");

const productos = express.Router();

productos.post("/", isAdmin, async (req, res) => {
    //Para incorporar productos al listado (disponible para administradores)
    try {
        let { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    
        if ( !nombre || !descripcion || !codigo || !foto || !precio || !stock ) {
            res.send("Propiedad/es faltante/s en el producto a agregar");
        }
        const newProduct = {
            timestamp: new Date().toLocaleString(),
            nombre: nombre,
            descripcion: descripcion,
            codigo: codigo,
            foto: foto,
            precio: precio,
            stock: stock
        }
        const result = await productosDao.save(newProduct);
        res.send(result);
    } catch (error) {
        logger.error(error);
    }
});

productos.get("/:id?", async (req, res) => {
    //Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
    try {
        if (req.params.id) {
            const producto = await productosDao.getById(req.params.id);
            res.send(producto);
        }
        const productos = await productosDao.getAll();
        res.send(productos);
    } catch (error) {
        logger.error(error);
    }
});
    
productos.put("/:id", isAdmin, async (req, res) => {
    //Actualiza un producto por su id (disponible para administradores)
    try {
        const updatedProduct = req.body;        
        const result = await productosDao.updateById(updatedProduct, req.params.id);
        res.send(result);   
    } catch (error) {
        logger.error(error);
    }
});

productos.delete("/:id", isAdmin, async (req, res) => { 
    //Borra un producto por su id (disponible para administradores)
    try {
        const result = await productosDao.deleteById(req.params.id);
        res.send(result);   
    } catch (error) {
        logger.error(error);
    }
});

module.exports = productos;