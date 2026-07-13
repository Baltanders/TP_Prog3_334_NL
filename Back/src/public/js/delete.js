
const contenedorProductos = document.getElementById("contenedor-productos");
const getProductForm = document.getElementById("getProduct-form");

const urlBase = "http://localhost:3001/api/products";


getProductForm.addEventListener("submit", async event => {
    event.preventDefault(); 
    const idProd = event.target.idProd.value.trim();

    if (!idProd) {
        mostrarError("Ingresá un id valido");
        return;
    }
    
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
        console.error("Error al obtener el producto ", error.message);
    }
});

//muestra error
function mostrarError(mensaje) {
    contenedorProductos.innerHTML = `
        <p class="mensaje mensaje-error">${mensaje}</p>
    `;
}

// muestra ok
function mostrarExito(mensaje) {
    contenedorProductos.innerHTML = `
        <p class="mensaje mensaje-exito">${mensaje}</p>
    `;
}


function renderizarProducto(producto) {
    let htmlProducto = `
    <ul>
        <li class="lista-producto">
            <img src="${producto.image}" alt="${producto.name}">
            <p>Id: ${producto.id} / Nombre: ${producto.name} / <strong>Precio: $${producto.price}</strong></p>
            <input type="button" id="deleteProduct-button" value="Eliminar Producto">
        </li>
    </ul>
    `;

    contenedorProductos.innerHTML = htmlProducto;
    const deleteProductButton = document.getElementById("deleteProduct-button");

    deleteProductButton.addEventListener("click", event => {
        event.stopPropagation(); 
        const confirmacion = confirm("Querés eliminar este producto?");
        
        if(!confirmacion) {
            alert("Eliminacion cancelada");
        } else {
            eliminarProducto(producto.id);
        }
    });
}

async function eliminarProducto(id) {
    try {
        const response = await fetch(`${urlBase}/${id}`, {
            method: "DELETE",
        });

        const result = await response.json();

        if(response.ok) {
            mostrarExito(result.message);
        } else {
            console.error("Error: ", result.message);
            mostrarError("No se pudo eliminar el producto");
        }

    } catch (error) {
        console.error("Error en la solicitud DELETE: ", error);
        mostrarError("Ocurrio un error al eliminar un producto");
    }
}