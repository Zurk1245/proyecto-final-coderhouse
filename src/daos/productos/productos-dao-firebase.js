const ProductManagement = require("../../contenedores/archivo-contenedor/contenedor-productos-archivo");
const config = require("../../config");

const productosDaoFirebase = new ProductManagement(config.firebase);

module.exports = productosDaoFirebase;