const passport = require("passport");
const { createTransport } = require("nodemailer");
const { CREDENCIALES_ADMINISTRADOR } = require("./../config/config");

// REGISTRO
const registerView = (req, res, next) => {
    try {
        let url;
        if (req.headers.host.includes("localhost")) {
            url = "http://localhost:8080";
        } else {
            url = "http://e-commerce-coderhouse.herokuapp.com";
        }
        res.render("registro", { url });
    } catch (error) {
        next(error);
    }
}

const registerVerify = async (req, res, next) => {
    try {
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
                <li>Nombre: ${req.user.nombre}</li>
                <li>Email: ${req.user.username}</li>
                <li>Dirección: ${req.user.direccion}</li>
                <li>Edad: ${req.user.edad}</li>
                <li>Teléfono: ${req.user.telefono}</li>
                <li>Foto: <img src="${req.user.foto}" alt="Foto de perfil" style="width: 20px;"></li>
            </ul>
            <h2 style="color: blue;">Saludos administrador!</h2>`
        }
        await transporter.sendMail(mailOptions);
        res.redirect("/");
    } catch (error) {
        next(error);
    }
}

const registerError = (req, res, next) => {
    try {
        res.render("error-registro");
    } catch (error) {
        next(error);
    }
}

//LOGIN
const loginView = (req, res, next) => {
    try {
        let url;
        if (req.headers.host.includes("localhost")) {
            url = "http://localhost:8080";
        } else {
            url = "http://e-commerce-coderhouse.herokuapp.com";
        }
        res.render("login", { url });
    } catch (error) {
        next(error);
    }
}

const loginVerify = (req, res, next) => {
    try {
        res.redirect(`/home`);
    } catch (error) {
        next(error);
    }
}

const loginError = (req, res, next) => {
    try {
        res.render("error-login");
    } catch (error) {
        next(error);
    }
}

//LOGOUT
const logout = (req, res, next) => {
    try {
        res.render("logout", { nombre: req.user.nombre });
        req.logOut();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    loginView,
    loginVerify,
    loginError,
    registerView,
    registerVerify,
    registerError,
    logout
}