const axios = require("axios");
const config = require('../config/config');
const { createTransport } = require("nodemailer");

const displayHomePageView = async (req, res, next) => {
    try {
        const productsRequest = await axios.get(`${config.URL}/api/productos`);
        const products = productsRequest.data;
        const usuario = {
            email: req.user.username,
            nombre: req.user.nombre, 
            direccion: req.user.direccion,
            edad: req.user.edad,
            telefono: req.user.telefono,
            foto: req.user.foto
        }
        res.render("home", { usuario, url: config.URL, products} );
    } catch (error) {
        next(error);
    }
}

const enviarPedido = async (req, res, next) => {
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
        res.redirect("/");
    } catch (error) {
        next(error)
    }
}

const getProductsByCategory = (req, res, next) => {
    try {
        res.render("categoria", { categoria: req.params.categoria, products });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = { displayHomePageView, enviarPedido, getProductsByCategory };