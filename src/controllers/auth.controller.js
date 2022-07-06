
const passport = require("passport");

const registerView = (req, res, next) => {
    try {
        let url;
        if (req.headers.host.includes("localhost")) {
            url = "http://localhost:8080";
        } else {
            url = "http://e-commerce-coderhouse.herokuapp.com";
        }
        res.render("registro", { url });
    } catch (error) {
        next(error);
    }
}

const registerVerify = async (req, res, next) => {
    try {
        return passport.authenticate("registro", { successRedirect: "/", failureRedirect: "/auth/registro/error" })(req, res, next);
    } catch (error) {
        next(error);
    }
}

const registerError = (req, res, next) => {
    try {
        res.render("error-registro");
    } catch (error) {
        next(error);
    }
}


const loginView = (req, res, next) => {
    try {
        let url;
        if (req.headers.host.includes("localhost")) {
            url = "http://localhost:8080";
        } else {
            url = "http://e-commerce-coderhouse.herokuapp.com";
        }
        res.render("login", { url });
    } catch (error) {
        next(error);
    }
}

const loginVerify = (req, res, next) => {
    try {
        return passport.authenticate("login", { successRedirect: "/", failureRedirect: "/auth/login/error" })(req, res, next);
    } catch (error) {
        next(error);
    }
}

const loginError = (req, res, next) => {
    try {
        res.render("error-login");
    } catch (error) {
        next(error);
    }
}


const logout = (req, res, next) => {
    try {
        let username;
        if (req.user.nombre) {
            username = req.user.nombre
        } else {
            username = "Usuario";
        }
        res.render("logout", { nombre: username });
        req.logOut();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    loginView,
    loginVerify,
    loginError,
    registerView,
    registerVerify,
    registerError,
    logout
}