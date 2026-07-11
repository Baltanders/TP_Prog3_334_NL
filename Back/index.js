import express from "express";
import enviroment from "./config/enviroment";
import connection from "./database/db";

import cors from "cors";

const app = express;
const PORT = enviroment.port;

//Middelwares
app.use(cors());

app.use((req, res, next) =>{
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
});

app.use(express.json());

const validateId = (req, res, next) => {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
        return res.status(400).json({
            error: "El id debe ser un numero entero positivo"
        });
    }

    const parsedId = parseInt(id, 10);

    if (parsedId === 0) {
        return res.status(400).json({
            error: "el id debe ser mayor a 0"
        });
    }

    req.id = parsedId;

    next();
}

//Endpontis
app.get("/", (req, res) => {
    res.send("Hola");
});

app.get("api/productos", async (req, res) => {
    try {
        const sql = "SELECT id, name, price, image FROM productos";

        const [rows] = await connection.query(sql);

        if (rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron productos"
            })            
        }

        res.status(200).json({
            total: rows.length,
            payload: rows
        });

    } catch (error) {
        console.log("Error: ", error.message);

        res.status(500).json({
            message: "Error interno"
        })
    }
})

app.get("/api/productos/:id", validateId, async (req,res) => {
    
    try {
        const sql = "SELECT id, name, price, image FROM productos WHERE productos.id = ?";
        const [rows] = await connection.query(sql, [req.id]);

        if (rows.length === 0 ) {
            return res.status(404).json({
                error: `No se encontro el producot ${req.id}`
            }); 
        }

        res.status(200).json({
            payload: rows[0]
        });
        
    } catch (error) {
        console.log("Error obtenido producots con id: ", error.message)

        res.status(500).json({
            error: "Error interno"
        })
        

    }
});

//Creacion
app.post("/api/productos", async (req, res) => {
    try {
        console.log(req.body);

        const {name, imagen,category, price} = req.body;

        const sql = "INSERT INTO productos (name, imagen, category, price) VALUES (?,?,?,?)";

        await connection.query(sql, [name, imagen, category, price]);

        res.status(200).json({
            message: "Producto cargado"
        });


    } catch (error) {
        console.log(error);
    }
});

//Actualizacion
app.put("/api/productos", async (req, res) => {
    try {
        const {id, name, image, category, price, active } = req.body;

        const sql = "UPADTE productos SET name = ?, image = ?, category = ?, price = ?, active = ? WHERE id = ?";

        await connection.query(sql, [name, image, category, price, active, id]);

        return res.status(200).json({
            message: "Producto Actualizado"
        });


    } catch (error) {
        console.log(error);
    }
});


//Borrado 
app.delete("/app/productos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        await connection.query("DELETE FROM productos WHERE id = ?", [id]);

        res.status(200).json({
            message: `Producto id ${id} eliminado`
        });

    } catch (error) {
        console.log(error);
    }
});


//Listener
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto $[PORT]`);
});