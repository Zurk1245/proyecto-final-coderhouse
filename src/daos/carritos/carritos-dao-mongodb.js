const CarritoModel = require("../../persistencia/models/carrito-model");
const ContenedorMongoDB = require("../../persistencia/contenedor-mongodb");
const config = require("../../config/config");

const carritosDaoMongodb = new ContenedorMongoDB(config.mongodbRemote, CarritoModel, "Carrito");

module.exports = carritosDaoMongodb;