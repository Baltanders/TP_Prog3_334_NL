import productosModel from "../models/product.models.js";

export const indexView = async (req, res) => {
    try {
        const [rows] = await productosModel.selectAllProducts();

        res.render("index", {
            title: "inicio",
            about: "Nuestros Productos",
            productosArray: rows
        });

    } catch (error) {
        console.log(error);
    }
}

//GET
export const getView = (req, res) => {
    res.render("get",{
        title: "Consultar",
        about: "Consultar productos"

    });
}

//POST
export const createView = (req, res) => {
    res.render("post", {
        title: "Crear",
        about: "Crear productos"
    });
}

//PUT
export const updateView = (req, res) => {
    res.render("put",{
        title: "Modificar",
        about: "Modificar productos"
    });
}

//DELETE
export const deleteView = (req, res) => {
    res.render("delete", {
        title: "Eliminar",
        about: "Eliminar productos"
    })
}