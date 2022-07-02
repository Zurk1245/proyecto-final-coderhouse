const config = require('../config/config');
const { createTransport } = require("nodemailer");
const twilio = require('twilio');
 
const homePage = async (req, res, next) => {
    try {
        let url;
        if (req.headers.host.includes("localhost")) {
            url = "http://localhost:8080";
        } else {
            url = "http://e-commerce-coderhouse.herokuapp.com";
        }
        const productsRequest = await fetch(`${url}/api/productos`);
        const products = await productsRequest.json();
        const usuario = {
            email: req.user.username,
            nombre: req.user.nombre, 
            direccion: req.user.direccion,
            edad: req.user.edad,
            telefono: req.user.telefono,
            foto: req.user.foto
        }
        res.render("home", { usuario, url, products} );
    } catch (error) {
        next(error)
    }
}

const pedido = async (req, res, next) => {
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
            to: config.CREDENCIALES_ADMINISTRADOR.mail,
            subject: `nuevo pedido de ${req.user.username}`,
            html: `<h2 style="color: blue;">Se ha solicitado un nuevo pedido en su aplicación de E-commerce. Los datos del pedido son los siguientes:</h2>
                <ul>
                    <li>Foto: <img src="${req.user.foto}" alt="Foto de perfil" style="width: 20px;"></li>
                    <li>Foto: ID del carrito: ${req.body.idCarrito}</li>
                    ${productsHtml}
                </ul>
                <h2 style="color: blue;">Saludos administrador!</h2>`
        }
        await transporter.sendMail(mailOptions);

        const client = twilio(config.CREDENCIALAES_TWILIO.accountSid, config.CREDENCIALAES_TWILIO.authToken);
        
        await client.messages.create({
            body: mailOptions.subject,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${config.CREDENCIALES_ADMINISTRADOR.telefono}`
        });

        await client.messages.create({
            body: `Hola ${req.user.nombre}! Tu pedido en el E-commerce ya está siendo procesado. Muchas gracias por elegirnos. Saludos!`,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${req.user.telefono}`
        });

        res.redirect("/");
    } catch (error) {
        next(error)
    }
}

module.exports = {
    homePage,
    pedido,
}
