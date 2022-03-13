const ProductoModel = require("../../contenedores/mongodb-contenedor/models/producto-model");
const { mongodbCreate, mongodbRead, mongodbUpdate, mongodbDelete } = require("../../contenedores/mongodb-contenedor/mongoCRUD");

class MongoDBProductosDAO {

    addProduct(producto) {
        const productoParaAgregar = new ProductoModel(producto);
        mongodbCreate(productoParaAgregar);
        return `Producto agregado`;
    }

    getAll() {
        mongodbRead(ProductoModel);
    }

    getById(id) {
        mongodbRead(ProductoModel, { id: id });
    }

    updateProduct(id, updatedProduct) {
        mongodbUpdate(ProductoModel, id, updatedProduct);
    }

    deleteProduct(id) {
        mongodbDelete(ProductoModel, id);
    }

}

module.exports = MongoDBProductosDAO;