const ProductManagement = require("../../contenedores/archivo-contenedor/contenedor-productos-archivo");
const config = require("../../config");

const productosDaoArchivo = new ProductManagement(config.archivo.productosPath);

module.exports = productosDaoArchivo;