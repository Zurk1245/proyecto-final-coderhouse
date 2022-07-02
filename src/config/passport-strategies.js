const LocalStrategy = require('passport-local').Strategy;
const config = require("./config");
const MONGO_URL = config.mongodbRemote.cnxStr;
const { createHash, isValidPassword } = require("../middlewares/middleware-functions");
const mongoose = require("mongoose");
const UsuarioModel = require("../persistencia/models/usuario-model");
const logger = require("./winston-logger");

/*----------- Strategies -----------*/
const loginStrategy = new LocalStrategy(async (username, password, done) => {
    try {
        await mongoose.connect(MONGO_URL);
        UsuarioModel.findOne({ username }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                logger.error(`Usuario no encontrado con el username ${username}`);
                return done(null, false);
            }
            if (!isValidPassword(user, password)) {
                logger.error("Contraseña invalida");
                return done(null, false);
            }
            return done(null, user);
        })
    } catch (error) {
        logger.error(error);        
    }
})
const registroStrategy = new LocalStrategy({passReqToCallback: true}, async (req, username, password, done) => {
    try {
        await mongoose.connect(MONGO_URL);
        UsuarioModel.findOne({ username }, (err, user) => {
            if (err) {
                logger.error(`Error en el registro: ${err}`);
                return done(err);
            }
            if (user) {
                logger.error("El usuario ya está registrado");
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
                    logger.error(`Error registrando al usuario: ${err}`);
                    done(err);
                }
                logger.info("Registro exitoso");
                done(null, user);
            });
        })
    } catch (error) {
        logger.error(error);        
    }
});


module.exports = { loginStrategy, registroStrategy };