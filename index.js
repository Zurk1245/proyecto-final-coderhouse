//ON BRANCH PRIMERA ENTREGA
//Texto para commit de prueba
const express = require("express");
const Carrito = require("./unidades/carrito");
const ContenedorCarritos = require("./contenedores/carritos");
const ProductManagement = require("./contenedores/productos");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const productos = express.Router();
app.use("/api/productos", productos);

const carrito = express.Router();
app.use("/api/carrito", carrito);

let administrador = true;

const contenedorDeCarritos = new ContenedorCarritos("./contenedores/carritos.txt");
const productManagement = new ProductManagement("./contenedores/productos.txt");

app.get('*', (req, res) => {
    const pathError = {
        error: -2,
        descripcion: `Error 404. Ruta ${req.url} método ${req.method} no implementado`
    }
    res.send(pathError);
});

productos.get("/:id?", async (req, res) => {
    //Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
    if (req.params.id) {
        const product = await productManagement.getById(req.params.id);
        res.send(product);
    } else {
        const products = await productManagement.getAll();
        res.send(products);
    }
});

productos.post("/", async (req, res) => {
    //Para incorporar productos al listado (disponible para administradores)
    if (administrador) {
        const newProduct = {
            timestamp: new Date().toLocaleString(),
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            codigo: req.body.codigo,
            foto: req.body.foto,
            precio: req.body.precio,
            stock: req.body.stock
        }
        
        let { nombre, descripcion, codigo, foto, precio, stock } = req.body;

        if ( !nombre || !descripcion || !codigo || !foto || !precio || !stock ) {
            res.send("Propiedad/es faltante/s en el producto a agregar");
        } else {
            const result = await productManagement.save(newProduct);
            res.send(result);
        }
    } else {
        const pathError = {
            error: -1,
            descripcion: `Ruta ${req.url} método ${req.method} no autorizada`
        }
        res.send(pathError);
    }
});
    
productos.put("/:id", async (req, res) => {
    //Actualiza un producto por su id (disponible para administradores)
    if (administrador) {
        const updatedProduct = req.body;        
        const result = await productManagement.updateById(updatedProduct, req.params.id);
        res.send(result);
    } else {
        const pathError = {
            error: -1,
            descripcion: `Ruta ${req.url} método ${req.method} no autorizada`
        }
        res.send(pathError);
    }
});

productos.delete("/:id", async (req, res) => { 
    //Borra un producto por su id (disponible para administradores)
    if (administrador) {
        const result = await productManagement.deleteById(req.params.id);
        //res.send(`Producto ${req.params.id} eliminado`);
        res.send(result);
    } else {
        const pathError = {
            error: -1,
            descripcion: `Ruta ${req.url} método ${req.method} no autorizada`
        }
        res.send(pathError);
    }
});




carrito.post("/", async (req, res) => {
    //Crea un carrito y devuelve su id.
    const carrito = new Carrito();
    await contenedorDeCarritos.save(carrito);
    res.send(`Carrito creado con el id ${carrito.id}`);
});

carrito.delete("/:id", async (req, res) => {
    //Vacía un carrito y lo elimina
    await contenedorDeCarritos.deleteById(req.params.id);
    res.send(`Carrito ${req.params.id} eliminado`);
});

carrito.get("/:id/productos", async (req, res) => {
    //Me permite listar todos los productos guardados en un carrito
    const carrito = await contenedorDeCarritos.getProductsByCarritoId(req.params.id);
    res.send(carrito);
});

carrito.post("/:id/productos", async (req, res) => {
    //Para incorporar productos al carrito por su id de producto en el body
    const idCarrito = req.params.id;
    const idProducto = parseInt(req.body.id);
    const result = await contenedorDeCarritos.addProductToCarritoById(idCarrito, idProducto);
    res.send(result);
});

carrito.delete("/:id/productos/:id_prod", async (req, res) => {
    // Eliminar un producto del carrito por su id de carrito y de producto
    const idCarrito = req.params.id;
    const idProducto = req.params.id_prod;
    const result = await contenedorDeCarritos.deleteProductFromCarritoByIds(idCarrito,idProducto);
    res.send(result);
});


const server = app.listen(PORT, () => {
    console.log("Sever running at port", PORT);
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