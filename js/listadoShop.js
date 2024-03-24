document.addEventListener("DOMContentLoaded", function () {
    const formAgregarProducto = document.getElementById("formularioAgregarProducto");
    const selectCategoria = document.getElementById("categoria");
    const inputNuevaCategoria = document.getElementById("nuevaCategoria");

    // Obtener las categorías del localStorage
    const carrito = JSON.parse(localStorage.getItem("productosEnCarrito")) || [];
    const categorias = new Set(carrito.map(producto => producto.categoria));
    categorias.add("Otra");

    // Llenar el select con las categorías
    categorias.forEach(categoria => {
        const option = document.createElement("option");
        option.textContent = categoria;
        selectCategoria.appendChild(option);
    });

    // Mostrar el input de nueva categoría si se selecciona "Otra"
    selectCategoria.addEventListener("change", function () {
        if (selectCategoria.value === "Otra") {
            inputNuevaCategoria.style.display = "block";
            inputNuevaCategoria.required = true;
        } else {
            inputNuevaCategoria.style.display = "none";
            inputNuevaCategoria.required = false;
        }
    });

    formAgregarProducto.addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtener los valores del formulario
        const titulo = formAgregarProducto.elements.titulo.value;
        const imagen = formAgregarProducto.elements.imagen.value;
        const categoria = inputNuevaCategoria.value || selectCategoria.value;
        const precio = parseFloat(formAgregarProducto.elements.precio.value);

        // Validar que los campos no estén vacíos
        if (!titulo || !imagen || !categoria || !precio) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        // Crear el nuevo producto
        const nuevoProducto = {
            id: titulo.toLowerCase().replace(/\s/g, '-'), // ID del producto basado en el título
            titulo: titulo,
            imagen: imagen,
            categoria: categoria.toLowerCase(), // Convertir la categoría a minúsculas
            precio: precio
        };

        // Obtener el array de productos del localStorage y agregar el nuevo producto
        let productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito")) || [];
        productosEnCarrito.push(nuevoProducto);

        // Actualizar el localStorage con el nuevo array de productos
        localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));

        // Limpiar el formulario
        formAgregarProducto.reset();

        alert("Producto agregado exitosamente.");
    });
});
