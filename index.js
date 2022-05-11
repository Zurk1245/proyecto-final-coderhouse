const express = require("express");
const app = express();
require("dotenv").config();

const productosRoute = require("./src/routes/productos");
const carritoRoute = require("./src/routes/carritos");
const registroRoute = require("./src/routes/registro");
const loginRoute = require("./src/routes/login");
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api/productos", productosRoute);
app.use("/api/carrito", carritoRoute);
app.use("/registro", registroRoute);
app.use("/login", loginRoute);

app.get('*', (req, res) => {
    const pathError = {
        error: -2,
        descripcion: `Error 404. Ruta ${req.url} método ${req.method} no implementado`
    }
    res.send(pathError);
});

const server = app.listen(PORT, () => {
    console.log("Sever running at port", PORT, `using the ${process.env.DB} database`);
});

server.on("error", error => console.log(error));



 
//CARRITO DE EJEMPLO
/* 
    {
		"id": "1",
		"timestamp": "17/2/2022 12:49:30",
		"productos": [
			{
				"id": 1,
				"timestamp": "17/2/2022 12:30:07",
				"nombre": "Manzana",
				"descripcion": "fruta roja",
				"codigo": "1",
				"foto": "https://cdn3.iconfinder.com/data/icons/back-to-school-6/128/APPLE.png",
				"precio": 10,
				"stock": 10
			}
		]
	}
*/