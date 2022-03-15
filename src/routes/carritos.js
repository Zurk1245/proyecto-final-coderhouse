const express = require("express");
const carrito = express.Router();

const Carrito = require("../unidades/carrito");
const ContenedorCarritos = require("../contenedores/carritos");
const contenedorDeCarritos = new ContenedorCarritos("c:/Users/maria/OneDrive/Escritorio/proyecto-final-coderhouse/src/contenedores/carritos.txt");

// let administrador = true;

carrito.post("/", async (req, res) => {
    //Crea un carrito y devuelve su id.
    const carrito = new Carrito();
    await contenedorDeCarritos.save(carrito);
    res.send(`Carrito creado con el id ${carrito.id}`);
});

carrito.delete("/:id", async (req, res) => {
    //Vacía un carrito y lo elimina
    await contenedorDeCarritos.deleteById(req.params.id);
    res.send(`Carrito ${req.params.id} eliminado`);
});

carrito.get("/:id/productos", async (req, res) => {
    //Me permite listar todos los productos guardados en un carrito
    const carrito = await contenedorDeCarritos.getProductsByCarritoId(req.params.id);
    res.send(carrito);
});

carrito.post("/:id/productos", async (req, res) => {
    //Para incorporar productos al carrito por su id de producto en el body
    const idCarrito = req.params.id;
    const idProducto = parseInt(req.body.id);
    const result = await contenedorDeCarritos.addProductToCarritoById(idCarrito, idProducto);
    res.send(result);
});

carrito.delete("/:id/productos/:id_prod", async (req, res) => {
    // Eliminar un producto del carrito por su id de carrito y de producto
    const idCarrito = req.params.id;
    const idProducto = req.params.id_prod;
    const result = await contenedorDeCarritos.deleteProductFromCarritoByIds(idCarrito, idProducto);
    res.send(result);
});


module.exports = carrito;