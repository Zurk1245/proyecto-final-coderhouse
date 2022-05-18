const ContenedorFirebase = require("../../contenedores/firebase-contenedor/contenedor-firebase");

const carritosDaoFirebase = new ContenedorFirebase("carritos", "Carrito");

module.exports = carritosDaoFirebase;