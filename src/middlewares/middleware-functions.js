const bCrypt = require("bcrypt");
const logger = require("../config/winston-logger");

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
function isValidPassword(usuario, password) {
    return bCrypt.compareSync(password, usuario.password)
}
function isLogged(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect("/auth/login");
}

let administrador = true;

function isAdmin(req, res, next) {
    if (administrador) {
        return next();
    }
    const pathError = {
        error: -1,
        descripcion: `Ruta ${req.url} método ${req.method} no autorizada`
    }
    logger.warn(pathError);
    return res.send(pathError);
}

module.exports = { createHash, isValidPassword, isLogged, isAdmin };