require("dotenv").config();
let url;
if (process.env.NODE_ENV == "desarrollo") {
    url = `http://localhost:${process.env.PORT}`;
} else {
    url = "http://e-commerce-coderhouse.herokuapp.com";
}

module.exports = {
    PORT: process.env.PORT || 8080,
    NODE_ENV: process.env.NODE_ENV,
    URL: url,
    CLUSTER: false,
    mongodbRemote: {
        client: "mongodb",
        cnxStr: process.env.CONNECTION_STRING
    },
    CREDENCIALES_ADMINISTRADOR: {
        mail: process.env.MAIL_ADMINISTRADOR,
    },
}