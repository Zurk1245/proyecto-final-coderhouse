const Producto = require("./models/Product");
const Carrito = require("./models/carrito-model");
const mongoose = require('mongoose');

const URL = 'mongodb://localhost:27017/ecommerce';

const mongodbCreate = async (collection, element) => {
    try {
        mongoose.connect(URL)
        const resultado = await collection.insertOne(element);
        console.log(resultado);

    } catch (error) {
        console.err(`Error: ${error}`);
    } finally {
        mongoose.disconnect().catch((err)=>{
            console.error(err);
        })
    }
}

const mongodbRead = async (collection, element) => {
    try {
        mongoose.connect(URL)
        const resultado = await collection.find(element);
        console.log(resultado);

    } catch (error) {
        console.err(`Error: ${error}`);
    } finally {
        mongoose.disconnect().catch((err)=>{
            console.error(err);
        })
    }
}

const mongodbUpdate = async (collection, element, updatedElement) => {
    try {
        mongoose.connect(URL)
        const resultado = await collection.updateOne(element, { $set: updatedElement } );
        console.log(resultado);
    } catch (error) {
        console.err(`Error: ${error}`);
    } finally {
        mongoose.disconnect().catch((err)=>{
            console.error(err);
        })
    }
}

const mongodbDelete = async (collection, element) => {
    try {
        mongoose.connect(URL)
        const resultado = await collection.deleteOne(element);
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