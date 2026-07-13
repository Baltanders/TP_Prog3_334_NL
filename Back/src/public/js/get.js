const contenedorProductos = document.getElementById("contenedor-productos");
const getProductForm = document.getElementById("getProduct-form");

getProductForm.addEventListener("submit", async event => {
    event.preventDefault(); //Evitamos el envio por defecto HTML del formulario
    const idProd = event.target.idProd.value.trim();

    if (!idProd) {
        mostrarError("Ingresá un id valido");
        return;
    }

    const urlBase = "http://localhost:3001/api/products";
    
    try {
        const response = await fetch(`${urlBase}/${idProd}`);
        console.log(response);

        const datos = await response.json();

        if (!response.ok) { 
            mostrarError(datos.message);
            return; 
        }

        const producto = datos.payload;
        console.log(producto); 
        renderizarProducto(producto);

    } catch (error) {
        console.error("Error al obtener el producto");

        mostrarError(error.message);
    }
});


function renderizarProducto(producto) {
    let htmlProducto = `
    <ul>
        <li class="lista-producto">
            <img src="${producto.image}" alt="${producto.name}">
            <p>Id: ${producto.id} / Nombre: ${producto.name} / <strong>Precio: $${producto.price}</strong></p>
        </li>
    </ul>
    `;

    contenedorProductos.innerHTML = htmlProducto;
}

function mostrarError(mensaje) {
    contenedorProductos.innerHTML = `
        <p class="mensaje mensaje-error">${mensaje}</p>
    `;
}