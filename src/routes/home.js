const express = require("express");
const { isLogged } = require("../middleware-functions");
const fetch = require("node-fetch");

const home = express.Router();

home.get("/", isLogged, async (req, res) => {
    let url;
    if (req.headers.host.includes("localhost")) {
        url = "http://localhost:8080";
    } else {
        url = "http://entregable-coder.herokuapp.com";
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
});

home.post("/logout", (req, res) => {
    res.render("logout", { nombre: req.user.nombre });
    req.logOut();
});


module.exports = home;