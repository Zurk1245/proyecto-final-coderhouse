const ProductoModel = require("../../models/producto-model");
const ContenedorMongoDB = require("../../contenedor-mongodb");
const config = require("../../../config/config");

const productosDaoMongodb = new ContenedorMongoDB(config.mongodbRemote, ProductoModel, "Producto");

module.exports = productosDaoMongodb;