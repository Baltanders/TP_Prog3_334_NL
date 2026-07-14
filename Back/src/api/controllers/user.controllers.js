
import connection_db from "../database/db.js";
import bcrypt from "bcrypt";

export const createUserAdmin = async (req, res) => {
    try {
        const {nameUser, emailUser, passwordUser } = req.body;

        if (!nameUser || !emailUser || !passwordUser ) {
            return res.status(400).json({
                message: "Datos requeridos"
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(passwordUser, saltRounds);

        const sql = "INSERT INTO usuarios (nombre, email, password, es_admin) values (?, ?, ?, ?)";

        const [rows] = await connection_db.query(sql, [nameUser, emailUser, hashedPassword, 1]);

        res.status(201).json({
            message: "Usuario creado"
        });


    } catch (error) {
        console.log("Error al crear usuario", error)

        return res.status(500).json({
            message: "Error interno"
        });
    }
}