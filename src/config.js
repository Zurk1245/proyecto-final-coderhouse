require("dotenv").config();
module.exports = {
    PORT: process.env.PORT || 8080,
    CLUSTER: false,
    mongodbRemote: {
        client: "mongodb",
        cnxStr: process.env.CONNECTION_STRING
    },
    CREDENCIALES_ADMINISTRADOR: {
        mail: "mendez.mariano@outlook.com.ar",
        telefono: "+5491163329554"
    },
    firebase: {
                apiKey: "AIzaSyDnNfnpNf5plsgkHivEuI6wPNbhaiFb3kE",
                authDomain: "ecommerce-backend-de062.firebaseapp.com",
                projectId: "ecommerce-backend-de062",
                storageBucket: "ecommerce-backend-de062.appspot.com",
                messagingSenderId: "1079491613714",
                appId: "1:1079491613714:web:d87a1bae8122b49c3b74cb",
                measurementId: "G-45TEYN7FSQ"
    },
    archivo: {
        productosPath: "c:/Users/maria/OneDrive/Escritorio/proyecto-final-coderhouse/src/DB/productos.txt",
        carritosPath: "c:/Users/maria/OneDrive/Escritorio/proyecto-final-coderhouse/src/DB/carritos.txt"
    }   
}