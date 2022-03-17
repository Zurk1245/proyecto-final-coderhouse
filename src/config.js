module.exports = {
    PORT: process.env.PORT || 8080,
    mongodbRemote: {
        client: "mongodb",
        cnxStr: "mongodb+srv://mariano:mariano@cluster0.z4zz9.mongodb.net/ecommerce?retryWrites=true&w=majority"
    }, 
    firebase: {

    },
    archivo: {
        productosPath: "c:/Users/maria/OneDrive/Escritorio/proyecto-final-coderhouse/src/DB/productos.txt",
        carritosPath: "c:/Users/maria/OneDrive/Escritorio/proyecto-final-coderhouse/src/DB/carritos.txt"
    }
}