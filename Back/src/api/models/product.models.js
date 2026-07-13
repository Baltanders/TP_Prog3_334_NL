import connection_db from "../database/db.js";

//Trae todos los productos
const selectAllProducts = () => {
    const sql = "SELECT id, name, price, image FROM products";

    return connection_db.query(sql);
}

//Traer productos id
const selectProductById = (id) => {
    const sql = "SELECT id, name, price, image FROM products where products.id = ?";
    return connection.query(sql, [id]);    
}

//Crear producto
const insertProduct = (name, image, category, price) => {
    const sql = "INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)";
    return connection.query(sql, [name, image, category, price]);
}

//Modificar producto
const updateProduct = () => {
    const sql = "UPDATE products SET name = ?, image = ?, category = ?, price = ?, active = ? WHERE id = ?";
    return connection.query(sql, [name, image, category, price, active, id]);
}

//Eliminar producto
const deleteProduct = () => {
    const sql = "DELETE FROM products WHERE id = ?";
    return connection.query(sql, [id]);
}

export default {
    selectAllProducts,
    selectProductById,
    insertProduct,
    updateProduct,
    deleteProduct
}