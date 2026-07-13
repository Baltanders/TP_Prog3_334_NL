//Index
const contenedorProductos = document.getElementById("contenedor-productos");

async function mostrarProductos () {
    try {
        const response = await fetch("http://localhost:3001/api/productos");
        const datos = await response.json();

        if(!response.ok) {
            throw new Error(`Error: ${response.status} ${response.message}`);
        }

        const productos = datos.payload;
        console.log(productos);

        renderizarProductos(productos);

    } catch (error) {
        console.error(`Error al cargar productos: ${error}`);
        contenedorProductos.innerHTML = `
        <p class="mensaje-error">${error}</p>
        `;

    }
}

function renderizarProductos(array) {

    let htmlProductos = "";
    ///**/
    array.forEach(producto => {
        htmlProductos += `
        <div class="card-producto">
            <p>Id: ${producto.id}</p>
            <h4>${producto.nomnbre}</h4>
            <p>$${producto.precio}</p>
            <img src="${producto.image}" alt="${producto.nombre}">
        </div>
        `;

        contenedorProductos.innerHTML = htmlProductos;
    })
}

mostrarProductos();