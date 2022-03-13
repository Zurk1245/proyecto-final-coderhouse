//const ProductoModel = require("./models/producto-model");
//const CarritoModel = require("./models/carrito-model");
const mongoose = require('mongoose');

const URL = 'mongodb://localhost:27017/ecommerce';

const mongodbCreate = async (element) => {
    try {
        mongoose.connect(URL)
        const resultado = await element.save();
        console.log(resultado);
    } catch (error) {
        console.err(`Error: ${error}`);
    } finally {
        mongoose.disconnect().catch((err)=>{
            console.error(err);
        })
    }
}

const mongodbRead = async (model, filter = undefined, projection = undefined) => {
    try {
        mongoose.connect(URL);
        if (filter !== undefined && projection !== undefined) {
            const resultado = await model.find(filter, projection);
            console.log(resultado);
        } else if (filter !== undefined) {
            const resultado = await model.find(filter);
            console.log(resultado);
        } else {
            const resultado = await model.find();
            console.log(resultado);
        }
    } catch (error) {
        console.err(`Error: ${error}`);
    } finally {
        mongoose.disconnect().catch((err)=>{
            console.error(err);
        })
    }
}

/*const mongodbReadOne = async (model, filter) => {
    try {
        mongoose.connect(URL)
        const resultado = await model.find(filter);
        console.log(resultado);
    } catch (error) {
        console.err(`Error: ${error}`);
    } finally {
        mongoose.disconnect().catch((err)=>{
            console.error(err);
        })
    }
}*/

const mongodbUpdate = async (model, filter, updatedElement) => {
    try {
        mongoose.connect(URL)
        const resultado = await model.updateOne(filter, { $set: updatedElement } );
        console.log(resultado);
    } catch (error) {
        console.err(`Error: ${error}`);
    } finally {
        mongoose.disconnect().catch((err)=>{
            console.error(err);
        })
    }
}

const mongodbDelete = async (model, filter) => {
    try {
        mongoose.connect(URL)
        const resultado = await model.deleteOne(filter);
        console.log(resultado);
    } catch (error) {
        console.err(`Error: ${error}`);
    } finally {
        mongoose.disconnect().catch((err)=>{
            console.error(err);
        })
    }
}


module.exports = { mongodbCreate, mongodbRead, mongodbUpdate, mongodbDelete };