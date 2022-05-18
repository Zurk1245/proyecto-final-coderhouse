require("dotenv").config();
const express = require("express");
const app = express();
const cluster = require("cluster");
const hbs = require("express-handlebars");
const passport = require('passport');
const { loginStrategy, registroStrategy } = require("./src/passport-strategies");
const session = require('express-session');
const cookieParser = require("cookie-parser");
const UsuarioModel = require("./src/contenedores/mongodb-contenedor/models/usuario-model");
const logger = require("./src/winston-logger");

/*============================[Middlewares]============================*/
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

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
        /*store: MongoStore.create({
            mongoUrl: MONGO_URL,
            mongoOptions: advancedOptions
        }),*/
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
passport.use("login", loginStrategy);
passport.use("registro", registroStrategy);
passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const usuario = await UsuarioModel.findById(id);
        done(null, usuario);    
    } catch (error) {
        logger.error(error);
    }
});

/*============================[Routers]============================*/
const productosRouter = require("./src/routes/productos");
const carritoRouter = require("./src/routes/carritos");
const registroRouter = require("./src/routes/registro");
const loginRouter = require("./src/routes/login");
const pedidoRouter = require("./src/routes/pedido");
const homeRouter = require("./src/routes/home");

app.use("/api/productos", productosRouter);
app.use("/api/carrito", carritoRouter);
app.use("/registro", registroRouter);
app.use("/login", loginRouter);
app.use("/pedido", pedidoRouter);
app.use("/", homeRouter);

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
const PORT = process.env.PORT || 8080;
const numCPUs = require("os").cpus().length;
const CLUSTER = false;

if (cluster.isMaster && CLUSTER) {

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', worker => {
        logger.warn(`Worker, ${worker.process.pid} died, ${new Date().toLocaleString()}`);
        cluster.fork();
    })

} else {
	const server = app.listen(PORT, () => {
		logger.info(`Sever running at port ${PORT} using the ${process.env.DB} database`);
	});
	server.on("error", error => logger.error(error));
}