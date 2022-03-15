const express = require("express");
const productosDao = process.env.DB == "mongodb" ? require("../daos/productos/ productos-dao-mongodb.js") :
                                        "arhivo" ? require("../daos/productos/productos-dao-archivo") : "";

const productos = express.Router();

let administrador = true;

productos.get("/:id?", async (req, res) => {
    //Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
    if (req.params.id) {
        const producto = await productosDao.getById(req.params.id);
        res.send(producto);
    } else {
        const productos = await productosDao.getAll();
        res.send(productos);
    }
});

productos.post("/", async (req, res) => {
    //Para incorporar productos al listado (disponible para administradores)
    if (administrador) {

        let { nombre, descripcion, codigo, foto, precio, stock } = req.body;

        const newProduct = {
            timestamp: new Date().toLocaleString(),
            nombre: nombre,
            descripcion: descripcion,
            codigo: codigo,
            foto: foto,
            precio: precio,
            stock: stock
        }
        
        if ( !nombre || !descripcion || !codigo || !foto || !precio || !stock ) {
            res.send("Propiedad/es faltante/s en el producto a agregar");
        } else {
            const result = await productosDao.save(newProduct);
            res.send(result);
        }
    } else {
        const pathError = {
            error: -1,
            descripcion: `Ruta ${req.url} método ${req.method} no autorizada`
        }
        res.send(pathError);
    }
});
    
productos.put("/:id", async (req, res) => {
    //Actualiza un producto por su id (disponible para administradores)
    if (administrador) {
        const updatedProduct = req.body;        
        const result = await productosDao.updateById(updatedProduct, req.params.id);
        res.send(result);
    } else {
        const pathError = {
            error: -1,
            descripcion: `Ruta ${req.url} método ${req.method} no autorizada`
        }
        res.send(pathError);
    }
});

productos.delete("/:id", async (req, res) => { 
    //Borra un producto por su id (disponible para administradores)
    if (administrador) {
        const result = await productosDao.deleteById(req.params.id);
        res.send(result);
    } else {
        const pathError = {
            error: -1,
            descripcion: `Ruta ${req.url} método ${req.method} no autorizada`
        }
        res.send(pathError);
    }
});

module.exports = productos;