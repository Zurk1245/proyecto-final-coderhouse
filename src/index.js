require("dotenv").config();
const express = require("express");
const app = express();
const cluster = require("cluster");
const hbs = require("express-handlebars");
const passport = require('passport');
const { loginStrategy, registroStrategy } = require("./config/passport-strategies");
const session = require('express-session');
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const config = require("./config/config");
const UsuarioModel = require("./persistencia/models/usuario-model");
const logger = require("./config/winston-logger");

/*============================[Middlewares]============================*/
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./public"));
app.use("/auth", express.static("./public"));

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
const PORT = process.env.PORT || 8080;
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
	const server = app.listen(PORT, () => {
		logger.info(`Process with pid ${process.pid} running at port ${PORT}`);
	});
	server.on("error", error => logger.error(error));
}