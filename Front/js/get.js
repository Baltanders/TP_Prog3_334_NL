        const contenedorProductos = document.getElementById("contenedor-productos");
        const getProductForm = document.getElementById("getProduct-form");

        getProductForm.addEventListener("submit", async event => {
            event.preventDefault(); //Evitamos el envio por defecto HTML del formulario

            // Extraemos el id del producto
            const idProd = event.target.idProd.value.trim();
            
            try {
                // Vamos a hacer el fetch a una URL personalizada
                const response = await fetch(`http://localhost:3000/api/products/${idProd}`);
                console.log(response);

                // Procesamos los datos que devuelve el servidor
                const datos = await response.json();

                const producto = datos.payload;

                console.log(producto); 
                /* {
                    "id": 41,
                    "name": "Fernet Cola Chabona",
                    "image": "https://pointlaventanita.com/wp-content/uploads/2024/05/chabona.webp",
                    "category": "drink",
                    "price": "4300.00",
                    "active": 1
                }*/

                renderizarProducto(producto);

            } catch (error) {
                console.error("Error al obtener el producto");
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
        