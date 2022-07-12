require("dotenv").config();
const express = require("express");
const app = express();
const cluster = require("cluster");
const hbs = require("express-handlebars");
const passport = require('./services/auth.services');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const config = require("./config/config");
const logger = require("./config/winston-logger");
const { conectarMongo } = require("./persistencia/database/mongo.connection");

/*============================[Middlewares]============================*/
app.use(express.json());
app.use(express.urlencoded({extended: true}));
/*--- Middlewares para que las rutas puedan utilizar los archivos estáticos ---*/
app.use(express.static("./public"));
app.use("/auth", express.static("./public"));
app.use("/auth/login", express.static("./public"));
app.use("/auth/registro", express.static("./public"));
app.use("/productos/:categoria", express.static("./public"));

/*----------- Motor de plantillas -----------*/
app.engine("hbs", hbs.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
}));
app.set("view engine", "hbs");
app.set("views", "./src/views");

/*----------- Session -----------*/
app.use(cookieParser("secreto"));
app.use(session({
        store: MongoStore.create({
            mongoUrl: config.mongodbRemote.cnxStr,
            mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
        }),
        secret: "secreto",
        cookie: {
            httpOnly: false,
            secure: false,
            maxAge: 1000 * 60 * 10
        },
        rolling: true,
        resave: true,
        saveUninitialized: true
}));

/*----------- Passport -----------*/
app.use(passport.initialize());
app.use(passport.session());

/*============================[Router]============================*/
const indexRouter = require("./routes/index.routes");
app.use("/", indexRouter);

/*----------- Fail route -----------*/
app.get('*', (req, res) => {
    const pathError = {
        error: -2,
        descripcion: `Error 404. Ruta ${req.url} método ${req.method} no implementado`
    }
    logger.warn(pathError);
    res.send(pathError);
});

/*============================[Servidor]============================*/
const numCPUs = require("os").cpus().length;

if (cluster.isMaster && config.CLUSTER) {

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', worker => {
        logger.warn(`Worker, ${worker.process.pid} died, ${new Date().toLocaleString()}`);
        cluster.fork();
    })

} else {
	const server = app.listen(config.PORT, () => {
		logger.info(`Process with pid ${process.pid} running at port ${config.PORT} en modo ${config.NODE_ENV}`);
	});
    conectarMongo(config.mongodbRemote.cnxStr)
                .then(() => logger.info('Mongodb conectado!'))
                .catch(err => logger.error(`Error al conectar mongo: ${err.message}`));
	server.on("error", error => logger.error(error));
}