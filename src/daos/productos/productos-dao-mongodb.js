const ProductoModel = require("../../persistencia/models/producto-model");
const ContenedorMongoDB = require("../../persistencia/contenedor-mongodb");
const config = require("../../config/config");

const productosDaoMongodb = new ContenedorMongoDB(config.mongodbRemote, ProductoModel, "Producto");

module.exports = productosDaoMongodb;