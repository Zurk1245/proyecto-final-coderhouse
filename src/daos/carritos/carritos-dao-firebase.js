const ContenedorFirebase = require("../../contenedores/firebase-contenedor/contenedor-firebase");
//const config = require("../../config");

const carritosDaoFirebase = new ContenedorFirebase("carritos", "Carrito");

module.exports = carritosDaoFirebase;