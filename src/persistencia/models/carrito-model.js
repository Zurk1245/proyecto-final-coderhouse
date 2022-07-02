const { Schema, model } = require('mongoose');
const ProductoModel = require('./producto-model');

const carritoSchema = new Schema({
    timestamp: {
        type: String,
        required: true
    },
    productos: {
        // type: [ProductoModel]
        type: Array
    }

});

const CarritoModel = model('Carrito', carritoSchema);

module.exports = CarritoModel;
