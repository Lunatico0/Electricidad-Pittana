let productos = [
    {
        id: "polea",
        titulo: "Polea",
        imagen: "../media/img/shop/polea_alt.png",
        categoria: {
            nombre: "Alternadores",
            id: "alternadores"
        },
        precio: 47252
    },
    {
        id: "rotor",
        titulo: "Rotor",
        imagen: "../media/img/shop/rotor_alt.png",
        categoria: {
            nombre: "Alternadores",
            id: "alternadores"
        },
        precio: 89558
    },
    {
        id: "estator",
        titulo: "Estator",
        imagen: "../media/img/shop/estator_alt.png",
        categoria: {
            nombre: "Alternadores",
            id: "alternadores"
        },
        precio: 47944
    },
    {
        id: "arranque-nuevo",
        titulo: "Arranque Nuevo",
        imagen: "../media/img/productos_arranque.png",
        categoria: {
            nombre: "Arranques",
            id: "arranques"
        },
        precio: 168750
    },
    {
        id: "impulsor",
        titulo: "Impulsor",
        imagen: "../media/img/shop/impulsor_arr.png",
        categoria: {
            nombre: "Arranques",
            id: "arranques"
        },
        precio: 23031
    },
    {
        id: "solenoide",
        titulo: "Solenoide",
        imagen: "../media/img/shop/solenoide_arr.png",
        categoria: {
            nombre: "Arranques",
            id: "arranques"
        },
        precio: 36995
    },
    {
        id: "campos",
        titulo: "Campos",
        imagen: "../media/img/shop/campos_arr.png",
        categoria: {
            nombre: "Arranques",
            id: "arranques"
        },
        precio: 44765
    },
];
// Constructor de objetos
function producto(id, titulo, imagen, categoria, precio) {
    this.id = id,
    this.titulo = titulo,
    this.imagen = imagen,
    this.categoria = categoria,
    this.precio = precio
};
let nuevoProducto = new producto(
    "alternador-nuevo", 
    "Alternador Nuevo", 
    "../media/img/productos_alternador_2.jpg",
    {
        nombre: "Alternadores",
        id: "alternadores"
    },
    467599
);
productos.push(nuevoProducto);


const contenedorProductos = document.querySelector("#productos");
const categorias = document.querySelectorAll(".botonCategoria");
const tituloPrincipal = document.querySelector("#tituloPrincipal");
const numerito = document.querySelector("#contCarrito");
let agregarCarrito = document.querySelectorAll(".agregarProducto");
const carritoLS = JSON.parse(localStorage.getItem(productosEnCarrito));
let carrito;

if(carritoLS){
    carrito = carritoLS;
} else {
    carrito = [];
}

function cargarProductos(select){
    contenedorProductos.innerHTML = "";
    select.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("item")
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}">
            <div class="itemDetalles">
                <h3 class="itemTitulo"> ${producto.titulo} </h3>
                <p class="itemPrecio"> $${producto.precio} </p>
                <button class="agregarProducto" id="${producto.id}">agregar</button>
            </div>
        `
        contenedorProductos.append(div);
    })
    actualizarAgregarCarrito()
};

cargarProductos(productos);

categorias.forEach( boton => {
    boton.addEventListener("click", (e) => {

        categorias.forEach( boton => boton.classList.remove("current"));
        e.currentTarget.classList.add("current");

        if(e.currentTarget.id != "todos"){
            const findProductos = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = findProductos.categoria.nombre;

            const filtroProductos = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(filtroProductos);
        } else {
            tituloPrincipal.innerText = "Todos los Productos";
            cargarProductos(productos);
        }
    })
});

function actualizarAgregarCarrito(){
    agregarCarrito = document.querySelectorAll(".agregarProducto");
    
    agregarCarrito.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    })
}


function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    if(carrito.some(producto => producto.id === idBoton)){
        const index = carrito.findIndex(producto => producto.id === idBoton)
        carrito[index].cantidad ++;
    } else {
        productoAgregado.cantidad = 1;
        carrito.push(productoAgregado);
    }
    actualizarNumerito();
    localStorage.setItem("productosEnCarrito", JSON.stringify(carrito));
};

function actualizarNumerito(){
    let nuevoNumerito = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
};