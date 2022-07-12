const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const { createHash, isValidPassword } = require("../middlewares/middleware-functions");
const { createTransport } = require("nodemailer");
const { CREDENCIALES_ADMINISTRADOR } = require("../config/config");
const UsuarioModel = require("../persistencia/models/usuario-model");
const logger = require("../config/winston-logger");

/*----------- Strategies -----------*/
passport.use("login", new LocalStrategy(async (username, password, done) => {
    try {
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
}));

passport.use("registro", new LocalStrategy({passReqToCallback: true}, async (req, username, password, done) => {
    try {
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
            UsuarioModel.create(newUser, async (err, user) => {
                if (err) {
                    logger.error(`Error registrando al usuario: ${err}`);
                    done(err);
                }
                //ENVÍO DE MAIL DE REGISTRO
                const transporter = createTransport({
                    service: "gmail",
                    port: 587,
                    auth: {
                        user: 'marianox3526@gmail.com',
                        pass: 'wunerwvdgapmlqol'
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });
                const mailOptions = {
                    from: 'Servidor Node.js',
                    to: CREDENCIALES_ADMINISTRADOR.mail,
                    subject: 'nuevo registro',
                    html: `<h2 style="color: blue;">Se ha registrado un nuevo usuario en su aplicación de E-commerce. Los datos del nuevo usuario son los siguientes:</h2>
                    <ul>
                        <li>Nombre: ${newUser.nombre}</li>
                        <li>Email: ${newUser.username}</li>
                        <li>Dirección: ${newUser.direccion}</li>
                        <li>Edad: ${newUser.edad}</li>
                        <li>Teléfono: ${newUser.telefono}</li>
                        <li>Foto: <img src="${newUser.foto}" alt="Foto de perfil" style="width: 20px;"></li>
                    </ul>
                    <h2 style="color: blue;">Saludos administrador!</h2>`
                }
                await transporter.sendMail(mailOptions);
                logger.info("Envío de mail y registro exitoso");
                done(null, user);
            });
        })
    } catch (error) {
        logger.error(`Error el registro o en el envío de mail de registro: ${error}`);        
    }
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const usuario = await UsuarioModel.findById(id);
        done(null, usuario);    
    } catch (error) {
        logger.error(`Error en la deserialización del usuario: ${error}`);
    }
});

module.exports = passport;