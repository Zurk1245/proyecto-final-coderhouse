const { Schema, model } = require('mongoose');

const productoSchema = new Schema({
    descripcion: {
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
    },
    categoria: {
        type: String,
        required: true
    }
});

const ProductoModel = model('Producto', productoSchema);

module.exports = ProductoModel;
