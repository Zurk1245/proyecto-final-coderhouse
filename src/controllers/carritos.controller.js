const carritoDao = require("../persistencia/daos/carritos/carritos-dao-mongodb");

const createCarrito = async (req, res, next) => {
    try {
        const result = await carritoDao.save();
        res.send(result);
    } catch (error) {
        next(error);
    }
}

const deleteCarrito = async (req, res, next) => {
    try {
        const result = await carritoDao.deleteById(req.params.id);
        res.send(result);
    } catch (error) {
        next(error);
    }
}

const addProductToCarrito = async (req, res, next) => {
    try {
        const idCarrito = req.params.id;
        const idProducto = req.body.id;
        const cantidadDeUnidades = req.body.cantidad;
        const result = await carritoDao.addProductToCarritoById(idCarrito, idProducto, cantidadDeUnidades);
        res.send(result);   
    } catch (error) {
        next(error);
    }
}


const getProductsFromCarrito = async (req, res, next) => {
    try {
        const productosCarrito = await carritoDao.getProductsByCarritoId(req.params.id);
        res.send(productosCarrito);
    } catch (error) {
        next(error);
    }
}


const deleteProductFromCarrito = async (req, res, next) => {
    try {
        const idCarrito = req.params.id;
        const idProducto = req.params.id_prod;
        const result = await carritoDao.deleteProductFromCarritoByIds(idCarrito, idProducto);
        res.send(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createCarrito,
    deleteCarrito,
    addProductToCarrito,
    getProductsFromCarrito,
    deleteProductFromCarrito
}