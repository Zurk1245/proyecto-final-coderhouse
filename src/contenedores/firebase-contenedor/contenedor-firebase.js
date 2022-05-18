const { initializeApp } = require("firebase/app"); 
const { getFirestore, getDoc, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, connectFirestoreEmulator } = require("firebase/firestore");
const config = require("../../config");
const logger = require("../../winston-logger");

initializeApp(config.firebase);

class ContenedorFirebase {

    constructor(collection, element) {
        this.collection = collection;
        this.db = getFirestore();
        this.element = element;
    }

    async save(element) {
        try {
            if (this.collection == "carritos") {
                let elementoParaAgregar = {
                    timestamp: new Date().toLocaleString(),
                    productos: []
                };
                const docRef = await addDoc(collection(this.db, "carritos"), elementoParaAgregar);
                return `Carrito agregado con el id ${docRef.id}`;

            } else if (this.collection == "productos") {
                const docRef = await addDoc(collection(this.db, "productos"), element);
                await updateDoc(docRef, {
                    id: docRef.id
                })
                return `Producto agregado con el id ${docRef.id}`;
            }
        } catch (error) {
            logger.error(`Error: ${error}`);
        } 
    }

    async getAll() {  //método solo para productos
        try {
            let productos = [];
            const querySnapshot = await getDocs(collection(this.db, "productos"));
            querySnapshot.forEach(doc => {
                productos.push(doc.data());
            });
            return productos;
        } catch (error) {
            logger.error(`Error: ${error}`);
        } 
    }

    async getById(id) {  //método solo para productos
        try {
            const docRef = doc(this.db, "productos", id);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                return `Producto con id ${id} no encontrado`;                   
            }            
            return docSnap.data();
        } catch (error) {
            logger.error(`Error: ${error}`);
        } 
    }

    async updateById(updatedElement, id) { //método solo para productos
        try {
            const docRef = doc(this.db, "productos", id);
            await updateDoc(docRef, updatedElement);
            return `Producto con id ${id} actualizado`;
        } catch (error) {
            if (error.message.includes("NOT_FOUND")) {
                return `Producto con id ${id} no encontrado`;
            }
            logger.error(`Error: ${error}`);
        } 
    }

    async deleteById(id) {
        try {
            const docRef = doc(this.db, this.collection, id);
            const docInfo = (await getDoc(docRef)).data();
            if (!docInfo) {
                return `${this.element} con id ${id} no encontrado`;
            }
            await deleteDoc(docRef);
            return `${this.element} con id ${id} eliminado`;
        } catch (error) {
            logger.error(`Error: ${error}`);
        } 
    }

    async addProductToCarritoById(idCarrito, idProducto) {
        try {
            const carritoRef = doc(this.db, "carritos", idCarrito);
            const carritoSnap = await getDoc(carritoRef);
            if (!carritoSnap.exists()) {
                return `Carrito con id ${idCarrito} no encontrado`;                   
            } 

            const productoRef = doc(this.db, "productos", idProducto);
            const productoSnap = await getDoc(productoRef);
            if (!productoSnap.exists()) {
                return `Producto con id ${idProducto} no encontrado`;                   
            }         

            const productos = carritoSnap.data().productos;
            productos.push(productoSnap.data());
            await updateDoc(carritoRef, {productos: productos});

            return `Producto con id ${idProducto} agregado al carrito con id ${idCarrito}`;
        } catch (error) {
            logger.error(`Error: ${error}`);
        }
    }

    async getProductsByCarritoId(idCarrito) {
        try {
            const carritoRef = doc(this.db, "carritos", idCarrito);
            const carritoSnap = await getDoc(carritoRef);
            if (!carritoSnap.exists()) {
                return `Carrito con id ${idCarrito} no encontrado`;                   
            } 
            const productos = carritoSnap.data().productos;
            return productos;
        } catch (error) {
            logger.error(`Error: ${error}`);
        }
    }

    async deleteProductFromCarritoByIds(idCarrito, idProducto) {
        try {
            const carritoRef = doc(this.db, "carritos", idCarrito);
            const carritoSnap = await getDoc(carritoRef);
            if (!carritoSnap.exists()) {
                return `Carrito con id ${idCarrito} no encontrado`;                   
            } 

            const productoRef = doc(this.db, "productos", idProducto);
            const productoSnap = await getDoc(productoRef);
            if (!productoSnap.exists()) {
                return `Producto con id ${idProducto} no encontrado`;                   
            }         

            const productosActualizados = carritoSnap.data().productos.filter(producto => producto.id !== idProducto);
            await updateDoc(carritoRef, {productos: productosActualizados});
            
            return `Producto con id ${idProducto} eliminado del carrito con id ${idCarrito}`;
        } catch (error) {
            logger.error(`Error: ${error}`);
        }
    }
    
}

module.exports = ContenedorFirebase;