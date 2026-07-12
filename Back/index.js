import express from "express";
import enviroment from "./src/api/config/enviroment.js";
import connection from "./src/api/database/db.js";

import cors from "cors";
import { PoolConnection } from "mysql2";

const app = express();
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

app.get("/api/productos", async (req, res) => {
    console.log("algo :: ");
    try {
        const sql = "SELECT id, idproducto, nombre, imagen, categoria, precio, activo FROM productos";

        console.log("algo1 :: ", PoolConnection.PORT);
        const [rows] = await connection.query(sql);

        console.log("algo2 :: ",rows.length);

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
        console.log("Error: ", error.message);

        res.status(500).json({
            message: "Error interno"
        });
    }
});

app.get("/api/productos/:id", validateId, async (req,res) => {
    
    try {
        console.log("#",req.id);


        const sql = "SELECT id, idproducto, nombre, imagen, categoria, precio, activo  FROM productos WHERE productos.id = ?";
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
        console.log("Error obtenido producots con id: ", error.message);

        res.status(500).json({
            error: "Error interno"
        });
        

    }
});

//Creacion
app.post("/api/productos", async (req, res) => {
    try {
        console.log(req.body);

        const {idproducto, nombre, imagen, categoria, precio, activo } = req.body;

        const sql = "INSERT INTO productos (idproducto, nombre, imagen, categoria, precio, activo ) VALUES (?,?,?,?,?,?)";

        await connection.query(sql, [idproducto, nombre, imagen, categoria, precio, activo ]);

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
        const {id, idproducto, nombre, imagen, categoria, precio, activo  } = req.body;

        const sql = "UPDATE productos SET idproducto =?, nombre=?, imagen =?, categoria=?, precio=?, activo=? WHERE id = ?";

        await connection.query(sql, [idproducto, nombre, imagen, categoria, precio, activo , id]);

        return res.status(200).json({
            message: "Producto Actualizado"
        });


    } catch (error) {
        console.log(error);
    }
});


//Borrado 
app.delete("/api/productos/:id", async (req, res) => {
    try {
        const {id} = req.params;

        console.log("sda", id);
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
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});