const fs = require("fs");

class ProductManagement {
    constructor(archivo) {
        this.archivo = archivo;
    }

    async save(product) {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            const parsedData = JSON.parse(data);
            product.id = parsedData.length == 0 ? 1 : parseInt(parsedData[parsedData.length - 1].id) + 1;
            parsedData.push(product);
            const stringifiedData = JSON.stringify(parsedData, null, '\t');
            await fs.promises.writeFile(this.archivo, stringifiedData);
            return product.id;
        } catch (error) {
            console.log(error);
        }
    }


    async getAll() {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            const parsedData = JSON.parse(data);
            console.log(parsedData ? parsedData : null);
            return parsedData ? parsedData : null; 
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            const parsedData = JSON.parse(data);
            const desiredElement = parsedData.find(elem => elem.id == id);
            return desiredElement ? desiredElement : null; 
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(updatedProduct, id) {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            const parsedData = JSON.parse(data);
            let productToUpdate = parsedData.find(obj => obj.id == id);
            let productIndex = parsedData.findIndex(obj => obj.id == id);
            parsedData[productIndex] = { ...productToUpdate, ...updatedProduct };
            const stringifiedData = JSON.stringify(parsedData, null, '\t');
            await fs.promises.writeFile(this.archivo, stringifiedData);
        } catch (error) {
            console.log(error);
        }
        
    }

    async deleteById(Number) {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            const parsedData = JSON.parse(data);
            const desiredObjectPositionToDelete = parsedData.findIndex(object => object.id == Number);
            if (desiredObjectPositionToDelete === -1) {
                console.log('Id not found');
                return;
            } else {
                parsedData.splice(desiredObjectPositionToDelete, 1);
                const stringifiedData = JSON.stringify(parsedData, null, "\t");
                await fs.promises.writeFile(this.archivo, stringifiedData);
            }
        } catch (error) {
                console.log(error);
            }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.archivo, '[]');
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ProductManagement;