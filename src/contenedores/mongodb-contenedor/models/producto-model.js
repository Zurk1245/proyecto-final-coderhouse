const { Schema, model } = require('mongoose');

const productoSchema = new Schema({
    // id: Number,
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

const ProductoModel = model('Producto', productoSchema);

module.exports = ProductoModel;
