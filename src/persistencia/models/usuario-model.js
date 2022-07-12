const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        nombre: {
            type: String,
        },
        direccion: {
            type: String,
        },
        edad: {
            type: Number,
        },
        telefono: {
            type: Number,
        },
        foto: {
            type: String,
        }
});

const UsuarioModel = model('Usuario', usuarioSchema);

module.exports = UsuarioModel;