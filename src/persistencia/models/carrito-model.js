const { Schema, model } = require('mongoose');

const carritoSchema = new Schema({
    timestamp: {
        type: String,
        required: true
    },
    productos: {
        type: Array
    }

});

const CarritoModel = model('Carrito', carritoSchema);

module.exports = CarritoModel;
