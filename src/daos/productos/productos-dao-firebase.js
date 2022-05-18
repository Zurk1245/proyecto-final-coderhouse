const ContenedorFirebase = require("../../contenedores/firebase-contenedor/contenedor-firebase");

const productosDaoFirebase = new ContenedorFirebase("productos", "Producto");

module.exports = productosDaoFirebase;