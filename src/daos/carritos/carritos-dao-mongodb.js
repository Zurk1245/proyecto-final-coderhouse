const CarritoModel = require("../../contenedores/mongodb-contenedor/models/carrito-model");
const ContenedorMongoDB = require("../../contenedores/mongodb-contenedor/contenedor-mongodb");
const config = require("../../config");

const carritosDaoMongodb = new ContenedorMongoDB(config.mongodbRemote, CarritoModel, "Carrito");

module.exports = carritosDaoMongodb;