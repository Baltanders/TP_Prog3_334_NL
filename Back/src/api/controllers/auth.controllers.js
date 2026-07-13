
import coneccion_db from "../database/db.js";
import bcrypt from "bcrypt";

export const loginView = (req, res) => {
    res.render("login",{
        title: "Login",
        about: "Ingresar email y password"
    });
}


export const getUserAdmin = async (req, res) =>{
    try {
        const {email, password} = req.body;

        if (!email, !password) {
            return res.render("login",{
                title: "Login",
                about: "Ingresar email y password",
                error: "Los campos son obligatorios"
            });
            
        }

        const sql = "SELECT * FROM usuarios WHERE eamil=?";
        const [rows] = await coneccion_db.query(sql, [email]);

        if (rows.length === 0) {
            return res.render("login",{
                title: "Login",
                about: "Ingresar email y password",
                error: "Datos incorrectos"
            });
        }

        const user = rows[0];
        console.table(user);

        const match = await bcrypt.compare(password, user.password);
        console.log(match);

        if (match) {
            req.session.user ={
                id: user.id,
                nombre: user.name,
                email: user.email
            }
            res.redirect("/dashboard/index");
            
        } else{
            return res.render("login", {
                title: "login",
                about: "Ingresar email y password",
                error: "Contraseña incorrecta"
            });
        }

    } catch (error) {
        console.log(error);
    }
}


export const eliminarSession = (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error("Error al eliminar la sesion: ", error);
            alert("Error al eliminar la sesion: ", error);

            return res.status(500).json({
                message: "Error al eliminar la sesion"
            });
        }

        res.redirect("/login");

    })
}