const CarritoModel = require("../../models/carrito-model");
const ContenedorMongoDB = require("../../contenedor-mongodb");
const config = require("../../../config/config");

const carritosDaoMongodb = new ContenedorMongoDB(config.mongodbRemote, CarritoModel, "Carrito");

module.exports = carritosDaoMongodb;