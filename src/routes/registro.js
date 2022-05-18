const express = require("express");
const passport = require('passport');
const registro = express.Router();
const { createTransport } = require("nodemailer");
const { CREDENCIALES_ADMINISTRADOR } = require("./../config");
const logger = require("../winston-logger");

registro.get("/", (req, res) => {
    let url;
    if (req.headers.host.includes("localhost")) {
        url = "http://localhost:8080";
    } else {
        url = "http://entregable-coder.herokuapp.com";
    }
    res.render("registro", { url });
});

registro.post("/", passport.authenticate("registro", { failureRedirect: "/registro/error" }), async (req, res) => {
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
        const info = await transporter.sendMail(mailOptions);
        res.redirect("/");
     } catch (error) {
        logger.error(error);
     }
});

registro.get("/error", (req, res) => {
    res.render("error-registro");
});

module.exports = registro;