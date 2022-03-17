const fs = require("fs");
//const carrito = require("../../routes/carritos");
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
            console.log(carrito);
            parsedData.push(carrito);
            const stringifiedData = JSON.stringify(parsedData, null, '\t');
            await fs.promises.writeFile(this.archivo, stringifiedData);
            return `Carrito creado con el id ${carrito.id}`;
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

    async getProductsByCarritoId(carritoId) {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            const parsedData = JSON.parse(data);
            const carritoPosition = parsedData.findIndex(carrito => carrito.id == carritoId);
            const desiredProducts = parsedData[carritoPosition].productos;
            return desiredProducts.length ? desiredProducts : `El carrito con id ${carritoId} no tiene productos agregados`; 
        } catch (error) {
            console.error(error);
        }
    }

    async addProductToCarritoById(carritoId, productoId) {
        try {
            const carritos = await fs.promises.readFile(this.archivo, 'utf-8');
            const parsedCarritos = JSON.parse(carritos);
            const carrito = parsedCarritos.find(carrito => carrito.id == carritoId);
    
            if (!carrito) return `Carrito con id ${carritoId} no encontrado`;

            const productos = await fs.promises.readFile("C:/Users/maria/OneDrive/Escritorio/proyecto-final-coderhouse/src/DB/productos.txt", 'utf-8');
            const parsedProductos = JSON.parse(productos);
            const productoParaAgregar = parsedProductos.find(producto => producto.id == productoId);

            if (productoParaAgregar) {
                if (productoParaAgregar.stock >= 1) {
                    productoParaAgregar.stock--;
                    const stringifiedProductos = JSON.stringify(parsedProductos, null, "\t");
                    await fs.promises.writeFile("C:/Users/maria/OneDrive/Escritorio/proyecto-final-coderhouse/src/DB/productos.txt", stringifiedProductos);
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

    async deleteById(carritoId) {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            const parsedData = JSON.parse(data);
            const desiredObjectPositionToDelete = parsedData.findIndex(object => object.id == carritoId);
            if (desiredObjectPositionToDelete === -1) {
                return `Carrito con id ${carritoId} no encontrado`;
            } else {
                parsedData.splice(desiredObjectPositionToDelete, 1);
                const stringifiedData = JSON.stringify(parsedData, null, "\t");
                await fs.promises.writeFile(this.archivo, stringifiedData);
                return `Carrito ${carritoId} eliminado`;
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