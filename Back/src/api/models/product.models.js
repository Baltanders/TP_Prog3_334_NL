import connection_db from "../database/db.js";

//Trae todos los productos
const selectAllProducts = () => {
    const sql = "SELECT id, nombre, imagen, categoria, precio FROM productos";

    return connection_db.query(sql);
}

//Traer productos id
const selectProductById = (id) => {
    const sql = "SELECT id, nombre, precio, imagen FROM productos where productos.id = ?";
    return connection_db.query(sql, [id]);    
}

//Crear producto
const insertProduct = (name, image, category, price) => {
    const sql = "INSERT INTO productos (nombre, imagen, categoria, precio) VALUES (?, ?, ?, ?)";
    return connection_db.query(sql, [name, image, category, price]);
}

//Modificar producto
const updateProduct = (name, image, category, price, active, id) => {
    const sql = "UPDATE productos SET name = ?, image = ?, category = ?, price = ?, active = ? WHERE id = ?";
    return connection_db.query(sql, [name, image, category, price, active, id]);
}

//Eliminar producto
const deleteProduct = (id) => {
    const sql = "DELETE FROM productos WHERE id = ?";
    return connection_db.query(sql, [id]);
}

export default {
    selectAllProducts,
    selectProductById,
    insertProduct,
    updateProduct,
    deleteProduct
}