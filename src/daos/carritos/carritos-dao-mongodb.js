const CarritoModel = require("../../contenedores/mongodb-contenedor/models/carrito-model");
const ContenedorMongoDB = require("../../contenedores/mongodb-contenedor/contenedor-mongodb");
const config = require("../../config");

const carritosDaoMongodb = new ContenedorMongoDB(config.mongodbRemote, CarritoModel, "Carrito");

module.exports = carritosDaoMongodb;


class MongoDBCarritosDAO {

    addCarrito(carrito) {
        //Falta la denominación de un id. Ver si usar el object_id u otro.
        const carritoParaAgregar = new CarritoModel(carrito);
        mongodbCreate(carritoParaAgregar);
        return `Carrito agregado`;
    }

    getProductsByCarritoId(carritoId) {
        mongodbRead(CarritoModel, { id: carritoId } , { productos: 1 });
    }

    getAll() {
        mongodbRead(CarritoModel);
    }

    getById(carritoId) {
        mongodbRead(CarritoModel, { id: carritoId });
    }

    addProductToCarritoById(idCarrito, idProducto) {
        const productos = mongodbRead({id: idCarrito}, {productos: 1});
        const prodcutoParaAgregar =  mongodbRead({id: idProducto});
        console.log(productos);
        console.log(prodcutoParaAgregar);
        productos.push(prodcutoParaAgregar);
        mongodbUpdate({id: idCarrito}, {productos: productos});
    }

    deleteCarrito(id) {
        mongodbDelete(CarritoModel, id);
    }

    deleteProductFromCarritoByIds(idCarrito, idProducto) {
        const productosDelCarrito = mongodbRead( {id: idCarrito}, {productos: 1});
        mongodbDelete();
    }

}
