const ContenedorFirebase = require("../../contenedores/firebase-contenedor/contenedor-firebase");
//const config = require("../../config");

const productosDaoFirebase = new ContenedorFirebase("productos", "Producto");

module.exports = productosDaoFirebase;