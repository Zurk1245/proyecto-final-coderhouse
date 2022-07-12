const logger = require("../config/winston-logger");
const productosDao = require("../persistencia/daos/productos/productos-dao-mongodb");

const addProductToCatalog = async (req, res, next) => {
    try {
        let { descripcion, foto, precio, categoria } = req.body;
        if ( !descripcion || !foto || !precio || !categoria ) {
            res.send("Propiedad/es faltante/s en el producto a agregar");
        }
        const newProduct = {
            descripcion: descripcion,
            foto: foto,
            precio: precio,
            categoria: categoria
        }
        const result = await productosDao.save(newProduct);
        res.send(result);
    } catch (error) {
        next(error);
    }
}

const getProductsFromCatalog = async (req, res, next) => {
    try {
        if (req.params.id) {
            const producto = await productosDao.getById(req.params.id);
            if (producto == undefined) {
                res.send("Producto no encontrado o no existe");
            }
            res.send(producto);
        }
        const productos = await productosDao.getAll();
        res.send(productos);
    } catch (error) {
        next(error);
    }
}

const getProductsByCategory = async (categoria) => {
    try {
        const productos = await productosDao.getByCategory(categoria.toLowerCase());
        return productos;
    } catch (error) {
        console.log(error);
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = req.body;        
        const result = await productosDao.updateById(updatedProduct, req.params.id);
        res.send(result);
    } catch (error) {
        next(error);
    }
}

const deleteProductFromCatalog = async (req, res, next) => {
    try {
        const result = await productosDao.deleteById(req.params.id);
        res.send(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    addProductToCatalog,
    getProductsFromCatalog,
    getProductsByCategory,
    updateProduct,
    deleteProductFromCatalog
}