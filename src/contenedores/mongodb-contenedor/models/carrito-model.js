const { Schema, model } = require('mongoose');
const ProductoModel = require("./producto-model");

const carritoSchema = new Schema({
    timestamp: {
        type: String,
        required: true
    },
    productos: {
        type: [ProductoModel]
    }

});

const CarritoModel = model('Carrito', carritoSchema);

module.exports = CarritoModel;
