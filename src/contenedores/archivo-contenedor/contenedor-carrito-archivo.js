const fs = require("fs");
const Carrito = require("../../unidades/carrito");

class ContenedorCarritos {
    constructor(archivo) {
        this.archivo = archivo;
    }

    async save() {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            const parsedData = JSON.parse(data);
            const carrito = new Carrito();
            carrito.id = parsedData.length == 0 ? 1 : parseInt(parsedData[parsedData.length - 1].id) + 1;
            parsedData.push(carrito);
            const stringifiedData = JSON.stringify(parsedData, null, '\t');
            await fs.promises.writeFile(this.archivo, stringifiedData);
            return carrito.id;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(Number) {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            const parsedData = JSON.parse(data);
            const desiredObject = parsedData.find(obj => obj.id == Number);
            console.log(desiredObject ? desiredObject : null);
            return desiredObject ? desiredObject : null; 
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

    async getProductsByCarritoId(id) {
        console.log(id);
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            const parsedData = JSON.parse(data);
            const containerPosition = parsedData.findIndex(cont => cont.id = id);
            console.log(parsedData[containerPosition]);
            const desiredProducts = parsedData[containerPosition].productos;
            return desiredProducts ? desiredProducts : null; 
        } catch (error) {
            console.log(error);
        }
    }

    async addProductToCarritoById(carritoId, productoId) {
        try {
            const carritos = await fs.promises.readFile(this.archivo, 'utf-8');
            const parsedCarritos = JSON.parse(carritos);
            const carrito = parsedCarritos.find(carrito => carrito.id == carritoId);
    
            if (!carrito) return `Carrito con id ${carritoId} no encontrado`;

            const productos = await fs.promises.readFile("./contenedores/productos.txt", 'utf-8');
            const parsedProductos = JSON.parse(productos);
            const productoParaAgregar = parsedProductos.find(producto => producto.id == productoId);

            if (productoParaAgregar) {
                if (productoParaAgregar.stock >= 1) {
                    productoParaAgregar.stock--;
                    const stringifiedProductos = JSON.stringify(parsedProductos, null, "\t");
                    await fs.promises.writeFile("./contenedores/productos.txt", stringifiedProductos);
                    carrito.productos.push(productoParaAgregar);
                    const stringifiedCarritos = JSON.stringify(parsedCarritos, null, "\t");
                    await fs.promises.writeFile(this.archivo, stringifiedCarritos);
                    return `Producto con id ${productoId} agregado al carrito con id ${carritoId}`;
                } else {
                    return `Producto con id ${productoId} agotado`;
                }
            } else {
                return `Producto con id ${productoId} no encontrado`;
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductFromCarritoByIds(carritoId, productId) {
        try {
            const carritos = await fs.promises.readFile(this.archivo, 'utf-8');
            const parsedCarritos = JSON.parse(carritos);
            const carritoPosition = parsedCarritos.findIndex(carrito => carrito.id == carritoId);
            if (carritoPosition == -1) {
                return `Carrito con id ${carritoId} no encontrado`;
            } else {
                const productPosisitionInCarrito = parsedCarritos[carritoPosition].productos.findIndex(product => product.id == productId);
                
                if (productPosisitionInCarrito == -1) {
                    return `Producto con id ${productId} en el carrito con id ${carritoId} no encontrado`;
                } else {
                    parsedCarritos[carritoPosition].productos.splice(productPosisitionInCarrito, 1);
                    const stringifiedCarritos = JSON.stringify(parsedCarritos, null, "\t");
                    await fs.promises.writeFile(this.archivo, stringifiedCarritos);
                    return `Producto con id ${productId} en carrito con id ${carritoId} eliminado`;
                }
            }
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

module.exports = ContenedorCarritos;