const { Schema, model } = require('mongoose');

const productoSchema = new Schema({
    timestamp: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    codigo: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true,
        default: 0
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    }
});

const productModel = model('Productos', productoSchema);

module.exports = productModel;
