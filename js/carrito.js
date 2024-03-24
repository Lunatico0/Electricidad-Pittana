const carrito = JSON.parse(localStorage.getItem("productosEnCarrito"));

const carritoEmpty = document.querySelector("#carritoEmpty");
const carritoItem = document.querySelector("#carritoItem");
const carritoAcciones = document.querySelector("#carritoAcciones");
const comprado = document.querySelector("#comprado");

if(carrito){
    carritoEmpty.classList.add("disabled");
    carritoItem.classList.remove("disabled");
    carritoAcciones.classList.remove("disabled");
    comprado.classList.add("disabled");

    carritoItem.innerHTML = "";

    carrito.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("itemProducto");
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carritoProductoTitulo">
                <h5>Titulo</h5>
                <h3>${producto.titulo}</h3>
            </div>
            <div class="carritoProductoCantidad">
                <h5>Cantidad</h5>
                <h3>${producto.cantidad}</h3>
            </div>
            <div class="carritoProductoPrecio">
                <h5>Precio</h5>
                <h3>$${producto.precio}</h3>
            </div>
            <div class="carritoProductoSubtotal">
                <h5>Subtotal</h5>
                <h3>$${producto.precio * producto.cantidad}</h3>
            </div>
            <button class="eliminarArticulo" id="${producto.id}" ><i class="bi bi-trash3"></i></button>
        `;
        carritoItem.append(div);
    })

} else{

}

