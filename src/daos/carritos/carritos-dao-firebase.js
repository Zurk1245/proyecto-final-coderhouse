const ProductManagement = require("../../contenedores/archivo-contenedor/contenedor-productos-archivo");
const config = require("../../config");

const carritosDaoFirebase = new ProductManagement(config.firebase);

module.exports = carritosDaoFirebase;