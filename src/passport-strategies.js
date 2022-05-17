const LocalStrategy = require('passport-local').Strategy;
const config = require("./config");
const MONGO_URL = config.mongodbRemote.cnxStr;
const { createHash, isValidPassword } = require("./middleware-functions");
const mongoose = require("mongoose");
const UsuarioModel = require("./contenedores/mongodb-contenedor/models/usuario-model");
const res = require('express/lib/response');
const { info } = require('winston');

/*----------- Strategies -----------*/
const loginStrategy = new LocalStrategy(async (username, password, done) => {
    try {
        await mongoose.connect(MONGO_URL);
        UsuarioModel.findOne({ username }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                console.log(`Usuario no encontrado con el username ${username}`);
                return done(null, false);
            }
            if (!isValidPassword(user, password)) {
                console.log("Contraseña invalida");
                return done(null, false);
            }
            return done(null, user);
        })
    } catch (error) {
        console.log(error);        
    }
})
const registroStrategy = new LocalStrategy({passReqToCallback: true}, async (req, username, password, done) => {
    try {
        await mongoose.connect(MONGO_URL);
        UsuarioModel.findOne({ username }, (err, user) => {
            if (err) {
                console.log(`Error en el registro: ${err}`);
                return done(err);
            }
            if (user) {
                console.log("El usuario ya está registrado");
                return done(null, false);
            }
            const newUser = {
                username,
                password: createHash(password),
                nombre: req.body.nombre,
                direccion: req.body.direccion,
                edad: req.body.edad,
                telefono: req.body.telefono,
                foto: req.body.foto
            }
            UsuarioModel.create(newUser, (err, user) => {
                if (err) {
                    console.log(`Error registrando al usuario: ${err}`);
                    done(err);
                }
                console.log(user);
                console.log("Registro exitoso");
                done(null, user);
            });
        })
    } catch (error) {
        console.log(error);        
    }
});


module.exports = { loginStrategy, registroStrategy };