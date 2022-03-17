const mongoose = require('mongoose');
const CarritoModel = require('./models/carrito-model');
const ProductoModel = require('./models/producto-model');

class ContenedorMongoDB {

    constructor(config, model, elementType) {
        this.config = config;
        this.model =  model;
        this.elementType = elementType;
    }

    async save(element) {
        try {
            await mongoose.connect(this.config.cnxStr);
            let elementoParaAgregar;

            if (this.model == CarritoModel) {
                elementoParaAgregar = this.model({
                    timestamp: new Date().toLocaleString(),
                    productos: []
                });
            } else if (this.model == ProductoModel) {
                elementoParaAgregar = this.model(element);
            }

            await elementoParaAgregar.save();
            return `${this.elementType} agregado con el id ${elementoParaAgregar._id}`;
        } catch (error) {
            console.error(`Error: ${error}`);
        } finally {
            mongoose.disconnect().catch((error) => {
                console.error(error);
            })
        }
    }

    async getAll() {
        try {
            await mongoose.connect(this.config.cnxStr);
            const resultado = await this.model.find();
            return resultado;
        } catch (error) {
            console.error(`Error: ${error}`);
        } finally {
            mongoose.disconnect().catch((error) => {
                console.error(error);
            })
        }
    }

    async getById(id) {
        try {
            await mongoose.connect(this.config.cnxStr);
            const resultado = await this.model.find({_id: id});
            return resultado;
        } catch (error) {
            console.error(`Error: ${error}`);
        } finally {
            mongoose.disconnect().catch((error) => {
                console.error(error);
            })
        }
    }

    async updateById(updatedElement, id) {
        try {
            await mongoose.connect(this.config.cnxStr);
            const resultado = await this.model.updateOne({_id: id}, { $set: updatedElement } );
            console.log(resultado);
            return `${this.elementType} con id ${id} actualizado`;
        } catch (error) {
            console.error(`Error: ${error}`);
        } finally {
            mongoose.disconnect().catch((error) => {
                console.error(error);
            })
        }
    }

    async deleteById(id) {
        try {
            await mongoose.connect(this.config.cnxStr);
            console.log("1");
            const result = await this.model.deleteOne({_id: id});
            console.log("2");
            console.log(result);
            return `${this.elementType} con id ${id} eliminado`;
        } catch (error) {
            console.error(`Error: ${error.message}`);
            if (error.message.includes("Cast to ObjectId failed for value")) {
                return `${this.elementType} con id ${id} no encontrado`;
            }
        } finally {
            mongoose.disconnect().catch((error) => {
                console.error(error);
            })
        }
    }

    async addProductToCarritoById(idCarrito, idProducto) {
        try {
            await mongoose.connect(this.config.cnxStr);
            const productoParaAgregar = await ProductoModel.findById(idProducto);
            await CarritoModel.updateOne({_id: idCarrito}, {$push: {productos: productoParaAgregar} });
            return `Producto con id ${idProducto} agregado al carrito con id ${idCarrito}`;
        } catch (error) {
            console.error(`Error: ${error.message}`);
            if (error.message.includes("Cast to ObjectId failed for value")) {
                return `Carrito o producto no encontrado`;
            }
        } finally {
            mongoose.disconnect().catch((error) => {
                console.error(error);
            })
        }
    }

    async getProductsByCarritoId(carritoId) {
        try {
            await mongoose.connect(this.config.cnxStr);
            const productosCarrito = await CarritoModel.findById(carritoId, {productos: 1, _id: 0});
            return productosCarrito;
        } catch (error) {
            console.error(`Error: ${error.message}`);
            if (error.message.includes("Cast to ObjectId failed for value")) {
                return `Carrito con id ${carritoId} no encontrado`;
            }
        } finally {
            mongoose.disconnect().catch((error) => {
                console.error(error);
            })
        }
    }

    async deleteProductFromCarritoByIds(idCarrito, idProducto) {
        try {
            await mongoose.connect(this.config.cnxStr);
            const carrito = await  CarritoModel.findOne({_id: idCarrito});
            let productos = carrito.productos;
            const productosActualizados = productos.filter(producto => producto._id != idProducto)
            carrito.productos = productosActualizados;
            await CarritoModel.updateOne({_id: idCarrito}, { $set: { productos: carrito.productos} } );
            return `Producto con id ${idProducto} eliminado del carrito con id ${idCarrito}`;
        } catch (error) {
            console.error(`Error: ${error.message}`);
            if (error.message.includes("Cast to ObjectId failed for value")) {
                return `Carrito con id ${idCarrito} o producto con id ${idProducto} no encontrado`;
            }
        } finally {
            mongoose.disconnect().catch((error) => {
                console.error(error);
            })
        }
    }
    
}

module.exports = ContenedorMongoDB;