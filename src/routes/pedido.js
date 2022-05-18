const express = require("express");
const pedido = express.Router();
const { createTransport } = require("nodemailer");
const { CREDENCIALES_ADMINISTRADOR } = require("./../config");
const twilio = require('twilio');
const logger = require("../winston-logger");

pedido.post("/", async (req, res) => {
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

        let productsHtml = "";
        req.body.productos.forEach(producto => {
            productsHtml = productsHtml.concat(`
                <li>Producto: ${producto.nombre}; ID del producto: ${producto.idProducto}; Cantidad: ${producto.cantidadProducto}</li>
            `)    
        });

        const mailOptions = {
            from: 'Servidor Node.js',
            to: CREDENCIALES_ADMINISTRADOR.mail,
            subject: `nuevo pedido de ${req.user.username}`,
            html: `<h2 style="color: blue;">Se ha solicitado un nuevo pedido en su aplicación de E-commerce. Los datos del pedido son los siguientes:</h2>
                <ul>
                    <li>Foto: <img src="${req.user.foto}" alt="Foto de perfil" style="width: 20px;"></li>
                    <li>Foto: ID del carrito: ${req.body.idCarrito}</li>
                    ${productsHtml}
                </ul>
                <h2 style="color: blue;">Saludos administrador!</h2>`
        }
        const info = await transporter.sendMail(mailOptions);

        const accountSid = 'AC87fc4555e2322dd35e1c59e15856fac6';
        const authToken = 'f058e9218e017273dd92edcf14577b75';
        
        const client = twilio(accountSid, authToken)
        
        const mensajeAdministrador = await client.messages.create({
            body: mailOptions.subject,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${CREDENCIALES_ADMINISTRADOR.telefono}`
        });

        const mensajeCliente = await client.messages.create({
            body: `Hola ${req.user.nombre}! Tu pedido en el E-commerce ya está siendo procesado. Muchas gracias por elegirnos. Saludos!`,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${req.user.telefono}`
        });

        res.send({ status: "success!" });
    } catch (error) {
        logger.error(error);
    }
});

module.exports = pedido;