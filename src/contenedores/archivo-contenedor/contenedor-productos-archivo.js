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
            return `Producto agregado con id ${product.id}`;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            const parsedData = JSON.parse(data);
            return parsedData.length ? parsedData : `No hay productos agregados`; 
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            const parsedData = JSON.parse(data);
            const desiredElement = parsedData.find(elem => elem.id == id);

            return desiredElement ? desiredElement : `Producto con id ${id} no encontrado`; 
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
            if (productIndex == -1) {
                return `Producto con id ${id} no encontrado`;
            } else {
                parsedData[productIndex] = { ...productToUpdate, ...updatedProduct };
                const stringifiedData = JSON.stringify(parsedData, null, '\t');
                await fs.promises.writeFile(this.archivo, stringifiedData);
                return `Producto con id ${id} actualizado`;
            }
            
        } catch (error) {
            console.log(error);
        }
        
    }

    async deleteById(id) {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            const parsedData = JSON.parse(data);
            const desiredObjectPositionToDelete = parsedData.findIndex(object => object.id == id);

            if (desiredObjectPositionToDelete === -1) {
                return `Producto a eliminar con id ${id} no encontrado`;
            } 

            parsedData.splice(desiredObjectPositionToDelete, 1);
            const stringifiedData = JSON.stringify(parsedData, null, "\t");
            await fs.promises.writeFile(this.archivo, stringifiedData);

            return `Producto con id ${id} eliminado`;
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