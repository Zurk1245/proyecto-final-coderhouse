const productosDao = require("../persistencia/daos/productos/productos-dao-mongodb");

const addProductToCatalog = async (req, res, next) => {
    try {
        let { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        if ( !nombre || !descripcion || !codigo || !foto || !precio || !stock ) {
            res.send("Propiedad/es faltante/s en el producto a agregar");
        }
        const newProduct = {
            timestamp: new Date().toLocaleString(),
            nombre: nombre,
            descripcion: descripcion,
            codigo: codigo,
            foto: foto,
            precio: precio,
            stock: stock
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
            res.send(producto);
        }
        const productos = await productosDao.getAll();
        res.send(productos);
    } catch (error) {
        next(error);
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
    updateProduct,
    deleteProductFromCatalog
}