import productosModel from "../models/product.models.js";

//Get 
export const getAllProducts = async (requestAnimationFrame, res) => {
    try {
        const [rows] = await productosModel.selectAllProducts();

        if (rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron productos"
            });            
        }

        res.status(200).json({
            total: rows.length,
            payload: rows
        });


    } catch (error) {
        console.log("Error al obtener productos: ", error.message);

        res.status(500).json({
            message: "Error interno al obtener productos"
        });

    }
}

//Get xid
export const getProductById = async (req, res) => {
    try {
        const [rows] = await productosModel.selectProductById(req.id);

        if (rows-length === 0) {
            return res.status(404).json({
                message: `No se encontro el producto id ${req.id}`
            });
        }

        res.status(200).json({
            payload: rows[0]
        });


    } catch (error) {
        console.log("Error al obtener producto por id: ", error.message);

        res.status(500).json({
            message: `Error interno con el producto id ${req.id}`
        });
    }
}


//Post
export const createProduct = async (req, res) => {
    try {
        const {nombre, imagen, categoria, precio} = req.body;

        if (!nombre || !imagen || !categoria || !precio) {
            return res.status(400).json({
                message: "Datos invalidos"
            });
        }

        const cleanName = nombre.trim();
        const [rows] = await productosModel.insertProduct(cleanName, imagen, categoria, precio);

        res.status(201).json({
            message: `Producto creado id: ${rows.insertId}`,
            productId: rows.insertId
        });

    } catch (error) {
        console.log("Error al crear producto ", error);
        res.status(500).json({
            message: "Error interno al crear un producto"
        });
    }
}


//Put
export const modifyProduct = async (req, res) =>{
    try {
        const {id, nombre, imagen, categoria, precio, activo} = req.body;

        if (!nombre || !imagen || !categoria || !precio) {
            return res.status(400).json({
                message: "Datos requeridos"
            });
        }

        const [result] = await productosModel.updateProduct(nombre, imagen, categoria, precio, id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message:"Producto no actualizado"
            });            
        }

        return res.status(200).json({
            message: 'Producto id ${id} actualizado'
        });

    } catch (error) {
        console.log("Error al actualizar un producto", error)

        res.status(500).json({
            message:"Error interno al actualizar un producto"
        });
    }
}

//Delete
export const removeProduct = async (req, res) =>{
    try {
        await productosModel.deleteProduct(req.id);

        return res.status(200).json({
            message: 'Producto id ${id} actualizado'
        });
        
    } catch (error) {
        console.log("Error al borrar un producto", error)

        res.status(500).json({
            message:"Error interno al borrar un producto"
        });
    }
}