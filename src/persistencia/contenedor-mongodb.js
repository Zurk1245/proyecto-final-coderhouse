const mongoose = require('mongoose');
const logger = require('../config/winston-logger');
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
            const responseObject = {
                status: "creación exitosa",
                elementType: this.elementType,
                elementId: elementoParaAgregar._id
            }
            const response = JSON.stringify(responseObject);
            return response;
        } catch (error) {
            logger.error(`Error: ${error}`);
        }
    }

    async getAll() {
        try {
            await mongoose.connect(this.config.cnxStr);
            const resultado = await this.model.find();
            return resultado;
        } catch (error) {
            logger.error(`Error: ${error}`);
        }
    }

    async getById(id) {
        try {
            await mongoose.connect(this.config.cnxStr);
            const resultado = await this.model.find({_id: id});
            return resultado;
        } catch (error) {
            logger.error(`Error: ${error}`);
        }
    }

    async updateById(updatedElement, id) {
        try {
            await mongoose.connect(this.config.cnxStr);
            const resultado = await this.model.updateOne({_id: id}, { $set: updatedElement } );
            return `${this.elementType} con id ${id} actualizado`;
        } catch (error) {
            logger.error(`Error: ${error}`);
        }
    }

    async deleteById(id) {
        try {
            await mongoose.connect(this.config.cnxStr);
            const result = await this.model.deleteOne({_id: id});
            return `${this.elementType} con id ${id} eliminado`;
        } catch (error) {
            logger.error(`Error: ${error.message}`);
            if (error.message.includes("Cast to ObjectId failed for value")) {
                return `${this.elementType} con id ${id} no encontrado`;
            }
        }
    }

    async addProductToCarritoById(idCarrito, idProducto, cantidadDeUnidades) {
        try {
            await mongoose.connect(this.config.cnxStr);
            const productoParaAgregar = await ProductoModel.findById(idProducto);
            await ProductoModel.findOneAndUpdate( {_id: idProducto}, { cantidad: cantidadDeUnidades});
            productoParaAgregar.cantidad = cantidadDeUnidades;
            await CarritoModel.updateOne({_id: idCarrito}, {$push: {productos: productoParaAgregar} });
            const responseObject = {
                status: "producto agregado con exito al carrito",
                productoId: idProducto,
                carritoId: idCarrito,
                cantidad: cantidadDeUnidades
            }
            const response = JSON.stringify(responseObject);
            await ProductoModel.findOneAndUpdate( {_id: idProducto}, { cantidad: 1});
            return response;
        } catch (error) {
            logger.error(`Error: ${error.message}`);
            if (error.message.includes("Cast to ObjectId failed for value")) {
                return `Carrito o producto no encontrado`;
            }
        }
    }

    async getProductsByCarritoId(carritoId) {
        try {
            await mongoose.connect(this.config.cnxStr);
            const productosCarrito = await CarritoModel.findById(carritoId, {productos: 1, _id: 0});
            return productosCarrito;
        } catch (error) {
            logger.error(`Error: ${error.message}`);
            if (error.message.includes("Cast to ObjectId failed for value")) {
                return `Carrito con id ${carritoId} no encontrado`;
            }
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
            logger.error(`Error: ${error.message}`);
            if (error.message.includes("Cast to ObjectId failed for value")) {
                return `Carrito con id ${idCarrito} o producto con id ${idProducto} no encontrado`;
            }
        }
    }
    
}

module.exports = ContenedorMongoDB;