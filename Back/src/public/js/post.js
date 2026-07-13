
const contenedorProductos = document.getElementById("contenedor-productos");
const postProductForm = document.getElementById("postProduct-form");
const postUserForm = document.getElementById("postUser-form");

function validarFormulario(data) {

    const errores = [];

    if (!data.name || data.name.trim().length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }

    if (!data.price || isNaN(data.price) || Number(data.price) < 0) {
        errores.push("El precio debe ser un numero mayor a 0");
    }

    // Multer

    if (!data.category) {
        errores.push("Debe seleccionar una categoria");
    }

    return errores;
}

function mostrarMensaje(tipo, mensaje) {
    contenedorProductos.innerHTML = `
        <p class="mensaje mensaje-${tipo}">${mensaje}</p>
    `;
}


postUserForm.addEventListener("submit", async event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.table(data);

    try {
        const urlBase = "http://localhost:3001/api/users/"
        const response = await fetch(urlBase, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        console.log(response);
        const result = await response.json();

        if (!response.ok) {
            mostrarMensaje("error", result.message);
            return;
        }

        console.log(result.message);

        mostrarMensaje("exito", result.message);

    } catch (error) {
        console.error("Error al enviar los datos: ", error);
        mostrarMensaje("error", "Error al procesar la solcitud")
    }

})


postProductForm.addEventListener("submit", async event => {
    event.preventDefault(); 

    const formData = new FormData(event.target); 
    const data = Object.fromEntries(formData.entries());
    console.log(data);          

    data.price = Number(data.price);

    const errores = validarFormulario(data);
    if (errores.length > 0) {
        mostrarMensaje("error", errores.join("\n"));
        return;
    }

    try {
        const urlBase = "http://localhost:3001/api/products/"
        const response = await fetch(urlBase, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        console.log(response);
        const result = await response.json();

        if (!response.ok) {
            mostrarMensaje("error", result.message);
            return;
        }

        console.log(result.message);

        mostrarMensaje("exito", result.message);

    } catch (error) {
        console.error("Error al enviar los datos: ", error);
        mostrarMensaje("error", "Error al procesar la solcitud")
    }
});
