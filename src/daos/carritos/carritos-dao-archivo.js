const ContenedorCarritos = require("../../contenedores/archivo-contenedor/contenedor-carrito-archivo");
const config = require("../../config");

const carritosDaoArchivo = new ContenedorCarritos(config.archivo.carritosPath);

module.exports = carritosDaoArchivo;