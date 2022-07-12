const ADD_TO_CART_BTNS = document.querySelectorAll(".btn-agregar-carrito");
const carrito = document.getElementById("carrito");
const elementoPrecioTotal = document.getElementById("precio-total");
const vaciarBtn = document.getElementById("btn-vaciar-carrito");
const enviarSolicitudBtn = document.getElementById("btn-enviar-solicitud");
const searchBtn = document.getElementById("searchBtn");

let url;
if (window.location.href.includes("localhost")) {
    url = "http://localhost:8080";
} else {
    url = "http://e-commerce-coderhouse.herokuapp.com";
}

ADD_TO_CART_BTNS.forEach(btn => {
    let cantidadClicks = 0;
    btn.addEventListener("click", () => {
        let precioCarritoTotal = Number(elementoPrecioTotal.textContent);
        const productName = btn.getAttribute("prod_ref");
        const productPrice = Number(btn.getAttribute("prod_price"));
        const productExists = document.getElementById(productName);

        if (productExists !== null) {
            const productCard = document.getElementById(`${productName}-card`);
            cantidadClicks == 0 ? cantidadClicks = 1 : cantidadClicks++;
            productCard.setAttribute("unidades", cantidadClicks);
            productExists.textContent = `${cantidadClicks} x ${productName} - $${productPrice}`;
            elementoPrecioTotal.textContent = precioCarritoTotal + productPrice;
            return;
        }

        cantidadClicks = 0;
        cantidadClicks++;
        const cardWithProduct = document.createElement("div");
        cardWithProduct.className = "cardWithProduct";
        const productId = btn.getAttribute("prod_id");
        cardWithProduct.setAttribute("prod_id", productId);
        cardWithProduct.setAttribute("unidades", cantidadClicks);
        const cardContent = document.createElement("p");
        cardContent.id = productName;
        cardWithProduct.id = `${productName}-card`;
        cardContent.textContent = `${cantidadClicks} x ${productName} - $${productPrice}`;
        cardWithProduct.appendChild(cardContent);
        carrito.appendChild(cardWithProduct);
        elementoPrecioTotal.textContent = precioCarritoTotal + productPrice;
    });
});

enviarSolicitudBtn.addEventListener("click", async () => {
    // 1.CREAR CARRITO
    const crearCarrito = await fetch(`${url}/api/carrito`, {
        method: "POST"
    });
    const dataCarrito = await crearCarrito.json();
    const idCarrito = dataCarrito.elementId;

    // 2.AGREGAR PRODUCTOS AL CARRITO
    const listaDeProductos = document.querySelectorAll(".cardWithProduct");
    listaDeProductos.forEach(async producto => {
        const productoId = producto.getAttribute("prod_id");
        const cantidadDeUnidades = Number(producto.getAttribute("unidades"));
        const requestBody = {
            id: productoId,
            cantidad: cantidadDeUnidades
        };
        const agregarProductoAlCarrito = await fetch(`${url}/api/carrito/${idCarrito}/productos`, {
            "method": "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });
        await agregarProductoAlCarrito.json();
    })

    // 3.FETCH PARA QUE SE ENVIE EL MAIL AL ADMINISTRADOR CON LA INFORMACIÓN DEL PEDIDO
    const productos = [];
    listaDeProductos.forEach(producto => {
        return productos.push({
            nombre: producto.id.substring(0, producto.id.indexOf("-")),
            idProducto: producto.getAttribute("prod_id"),
            cantidadProducto: producto.getAttribute("unidades")
        });
    });

    const mailRequestBody = {
        idCarrito: idCarrito,
        productos: productos

    };
    
    await fetch(`${url}/productos/pedido`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mailRequestBody)
    });
});

vaciarBtn.addEventListener("click", () => {
    const listaDeProductos = document.querySelectorAll(".cardWithProduct");
    for (let i = 0; i < ADD_TO_CART_BTNS.length; i++) {
        cantidadClicks = 0;
    }
    for (let i = 0; i < listaDeProductos.length; i++) {
        const elementoParaEliminar = listaDeProductos[i];
        elementoParaEliminar.setAttribute("unidades", 0);
        elementoPrecioTotal.textContent = "0.00";
        carrito.removeChild(elementoParaEliminar);
    }
});

searchBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    const categoria = document.getElementById("input-categoria").value;
    window.location.href = `${url}/productos/${categoria}`;
});