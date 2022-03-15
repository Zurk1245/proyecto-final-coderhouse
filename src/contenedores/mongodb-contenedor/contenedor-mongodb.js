const mongoose = require('mongoose');

class ContenedorMongoDB {

    constructor(config, model, elementType) {
        this.config = config;
        this.model =  model;
        this.elementType = elementType;
    }

    async save(element) {
        try {
            await mongoose.connect(this.config.cnxStr);
            const elementoParaAgregar = this.model(element);
            await elementoParaAgregar.save();
            return `${this.elementType} agregado con el id ${elementoParaAgregar._id}`;
        } catch (error) {
            console.error(`Error: ${error}`);
        } finally {
            mongoose.disconnect().catch((error)=>{
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
            mongoose.disconnect().catch((error)=>{
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
            mongoose.disconnect().catch((error)=>{
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
            mongoose.disconnect().catch((error)=>{
                console.error(error);
            })
        }
    }

    async deleteById(id) {
        try {
            await mongoose.connect(this.config.cnxStr);
            await this.model.deleteOne({_id: id});
            return `${this.elementType} con id ${id} eliminado`;
        } catch (error) {
            console.error(`Error: ${error}`);
        } finally {
            mongoose.disconnect().catch((error)=>{
                console.error(error);
            })
        }
    }
    
}

module.exports = ContenedorMongoDB;