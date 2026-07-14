import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";


// Para obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../../uploads"));
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});


// Middleware multer
const upload = multer({
    storage: storage
});

//Midelwares
const logguerURL = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
}


//filtro de rutas
const validateId = (req, res, next) => {

    const {id} = req.params;

    if(!/^\d+$/.test(id)) {
        return res.status(400).json({
            message: "El ID debe ser un numero entero positivo"
        });
    }

    const parsedId = parseInt(id, 10);

    if(parsedId === 0) {
        return res.status(400).json({
            message: "El id debe ser mayor a 0"
        });
    }
    
    req.id = parsedId;

    next();

}


//Validar los campos
const categoriasValidas = ["comida", "tragos"];
const validateProduct = (req, res, next) => {
    const { name, price, category } = req.body;
    const errores = [];
console.log("asd:", req.body);

    if (typeof name !== "string" || name.trim().length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }

    if (typeof price !== "number" || price <= 0) {
        errores.push("El precio debe ser un numero mayor a 0");
    }

    //multer?

    if (!categoriasValidas.includes(category)) {
        errores.push("Categoria invalida");
    }

    if (errores.length > 0) {
        return res.status(400).json({
            message: "Datos invalidos2", errores
        })
    }

    next();    
}


//
const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");     
    }

    next();
}

//
export {
    logguerURL,
    validateId,
    validateProduct,
    requireLogin
}