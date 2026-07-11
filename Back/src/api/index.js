
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
app.length("/", (req, res) => {
    res.send("Hola");
});
