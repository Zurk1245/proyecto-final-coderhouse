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

const contenedorDeCarritos = new ContenedorCarritos("./carritos.txt");
const productManagement = new ProductManagement("./productos.txt");

app.get('*', (req, res) => {
    const pathError = {
        error: -2,
        descripcion: `Error 404. Ruta ${req.url} método ${req.method} no implementado`
    }
    res.send(pathError);
});

productos
    .route("/:id?")
    .get(async (req, res) => { //FUNCIONA
        //Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
        if (req.query.id) {
            const product = await productManagement.getById(req.query.id);
            res.send(product);
        } else {
            const products = await productManagement.getAll();
            res.send(products);
        }
    })
    .put(async (req, res) => { //FUNCIONA
        //Actualiza un producto por su id (disponible para administradores)
        if (administrador) {
            const updatedProduct = {
                timestamp: new Date().toLocaleString(),
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                codigo: req.body.codigo,
                foto: req.body.foto,
                precio: req.body.precio,
                stock: req.body.stock
            }
            await productManagement.updateById(updatedProduct.timestamp, updatedProduct.nombre, updatedProduct.descripcion, updatedProduct.codigo, updatedProduct.foto, updatedProduct.precio, updatedProduct.stock, req.query.id);
            res.send(`Producto ${req.query.id} actualizado`);
        } else {
            const pathError = {
                error: -1,
                descripcion: `Ruta ${req.url} método ${req.method} no autorizada`
            }
            res.send(pathError);
        }
    })
    .delete(async (req, res) => { //FUNCIONA
        //Borra un producto por su id (disponible para administradores)
        if (administrador) {
            await productManagement.deleteById(req.query.id);
            res.send(`Producto ${req.query.id} eliminado`);
        } else {
            const pathError = {
                error: -1,
                descripcion: `Ruta ${req.url} método ${req.method} no autorizada`
            }
            res.send(pathError);
        }
    });

productos.post("/", async (req, res) => { //FUNCIONA
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
        await productManagement.save(newProduct);
        res.send("Producto agregado!");
    } else {
        const pathError = {
            error: -1,
            descripcion: `Ruta ${req.url} método ${req.method} no autorizada`
        }
        res.send(pathError);
    }
});



carrito.post("/", async (req, res) => { //FUNCIONA
    //Crea un carrito y devuelve su id.
    const carrito = new Carrito();
    await contenedorDeCarritos.save(carrito);
    res.send(`Carrito creado con el id ${carrito.id}`);
});

carrito.delete("/:id", async (req, res) => { //FUNCIONA
    //Vacía un carrito y lo elimina
    await contenedorDeCarritos.deleteById(req.query.id);
    res.send(`Carrito ${req.query.id} eliminado`);
});

carrito
    .route("/:id/productos") //FUNCIONA
    .get(async (req, res) => {
        //Me permite listar todos los productos guardados en un carrito
        const carrito = await contenedorDeCarritos.getProductsByCarritoId(req.params.id);
        res.send(carrito);
    })
    .post(async (req, res) => { //FUNCIONA
        //Para incorporar productos al carrito por su id de producto
        const productoId = req.body.id;
        const carritoId = req.params.id;
        const result = await contenedorDeCarritos.addProductToCarritoById(carritoId, productoId);
        res.send(result);
    });

carrito.delete("/:id/productos/:id_prod", async (req, res) => { //FUNCIONA
    // Eliminar un producto del carrito por su id de carrito y de producto
    const result = await contenedorDeCarritos.deleteProductFromCarritoByIds(req.params.id, req.query.id_prod);
    res.send(result);
});


const server = app.listen(PORT, () => {
    console.log("Sever running at port", PORT);
});

server.on("error", error => console.log(error));