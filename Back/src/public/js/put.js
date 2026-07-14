const contenedorProductos = document.getElementById("contenedor-productos");
const getProductForm = document.getElementById("getProduct-form");
const contenedorForm = document.getElementById("contenedor-form");
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
        console.error("Error al obtener el producto", error);
    }
});


function mostrarError(mensaje) {
    contenedorProductos.innerHTML = `
        <p class="mensaje mensaje-error">${mensaje}</p>
    `;
}


function mostrarExito(mensaje) {
    contenedorProductos.innerHTML = `
        <p class="mensaje mensaje-exito">${mensaje}</p>
    `;
}

function renderizarProducto(producto) {
    let htmlProducto = `
    <ul>
        <li class="lista-producto">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p>Id: ${producto.id} / Nombre: ${producto.nombre} / <strong>Precio: $${producto.precio}</strong></p>
            <input type="button" id="updateProduct-button" value="Actualizar Producto">
        </li>
    </ul>
    `;

    contenedorProductos.innerHTML = htmlProducto;

    const updateProductButton = document.getElementById("updateProduct-button");

    updateProductButton.addEventListener("click", event => {
        event.stopPropagation(); // Evitamos la propagacion de eventos

        formularioPutProducto(event, producto);
    });
}


function formularioPutProducto(event, producto) {
    event.stopPropagation();

    console.log(producto);

    let htmlUpdateForm = `
        <h2>Actualizar producto</h2>
    
        <form id="updateProduct-form" class="form-alta">

            <input type="hidden" id="idProd" name="id" value="${producto.id}">

            <label for="nameProd">Nombre</label>
            <input type="text" name="name" id="nameProd" value="${producto.nombre}" required>

            <label for="imageProd">Imagen</label>
            <input type="text" name="image" id="imageProd" value="${producto.imagen}" required>

            <label for="categoryProd">Categoria</label>
            <select name="category" id="categoryProd" required>
                <option value="food">comida</option>
                <option value="drink">bebida</option>
            </select>

            <label for="priceProd">Precio</label>
            <input type="number" name="price" id="priceProd" value="${producto.precio}" required>

            <label for="activeProd">Activo</label>
            <select name="active" id="activeProd" required>
                <option value="1">activo</option>
                <option value="0">inactivo</option>
            </select>
            
            <div>
                <input type="submit" value="Actualizar producto">
            </div>
        </form>
    `;

    contenedorForm.innerHTML = htmlUpdateForm;

    const updateProductForm = document.getElementById("updateProduct-form");

    updateProductForm.addEventListener("submit", event => {
        actualizarProducto(event); 
    });
}

async function actualizarProducto(event) {
/*
    const confirmacion = confirm("Querés actualizar este producto?");
    
    if(!confirmacion) {
        alert("Actualización cancelada");
        return;
    }*/

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.table(data);
    console.log("PUT_:", data);

    if (!data.name || !data.image || !data.price) {
        alert("Todos los campos son obligatorios");
        return;
    }
    
    try {
        const response = await fetch(urlBase, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        console.log(response);
        const result = await response.json();

        if(response.ok) {
            contenedorForm.innerHTML = "";
            console.log(result.message);
            mostrarExito(result.message);

        } else {
            console.error("Error:", result.message);
            mostrarError(result.message);
        }

    } catch (error) {
        console.error("Error al enviar los datos: ", error.message);
        mostrarError(error.message);
    }
    
}