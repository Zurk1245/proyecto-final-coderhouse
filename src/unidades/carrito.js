class Carrito {
    constructor() {
        this.timestamp = new Date().toLocaleString();
        this.productos = [];
    }
}

module.exports = Carrito;