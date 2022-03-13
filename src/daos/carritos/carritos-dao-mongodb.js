const CarritoModel = require("../../contenedores/mongodb-contenedor/models/carrito-model");
const { mongodbCreate, mongodbRead, mongodbUpdate, mongodbDelete } = require("../../contenedores/mongodb-contenedor/mongoCRUD");

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

    updateProduct(id, updatedProduct) {
        mongodbUpdate(CarritoModel, id, updatedProduct);
    }

    deleteCarrito(id) {
        mongodbDelete(CarritoModel, id);
    }

}

module.exports = MongoDBCarritosDAO;