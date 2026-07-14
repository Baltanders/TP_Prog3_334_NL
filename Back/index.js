import express from "express";
import enviroment from "./src/api/config/enviroment.js";
import connection from "./src/api/database/db.js";

import cors from "cors";
//import { PoolConnection } from "mysql2";
import { logguerURL } from "./src/api/middlewares/middlewares.js";
import { authRoutes, productRoutes, userRoutes, viewRoutes } from "./src/api/routes/index.js";
import { join, __dirname } from "./src/api/utils/index.js";
import session from "express-session";

const { port, session_key } = enviroment;
const app = express();
const PORT = port;

app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views"));




//Middelwares
app.use(cors());

app.use(logguerURL);


app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(express.static(join(__dirname, "src/public")));

app.use(session({
    secret: session_key,
    resave: false,
    saveUninitialized: true
}));


 
//
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/dashboard", viewRoutes);
app.use("/login", authRoutes);


//Listener
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});