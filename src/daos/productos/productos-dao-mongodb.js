const ProductoModel = require("../../contenedores/mongodb-contenedor/models/producto-model");
const ContenedorMongoDB = require("../../contenedores/mongodb-contenedor/contenedor-mongodb");
const config = require("../../config");

const productosDaoMongodb = new ContenedorMongoDB(config.mongodbRemote, ProductoModel, "Producto");

module.exports = productosDaoMongodb;