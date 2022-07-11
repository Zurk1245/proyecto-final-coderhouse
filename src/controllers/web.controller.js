const webServices = require("../services/web.services");
 
const homePage = async (req, res, next) => {
    try {
        await webServices.displayHomePageView(req, res, next);
    } catch (error) {
        next(error);
    }
}

const pedido = async (req, res, next) => {
    try {
        await webServices.enviarPedido(req, res, next);
    } catch (error) {
        next(error);
    }
}

const categoryPage = async (req, res, next) => {
    try {
        webServices.getProductsByCategory(req, res, next);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    homePage,
    pedido,
    categoryPage
}