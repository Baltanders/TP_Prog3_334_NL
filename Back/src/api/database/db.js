//conceccion al bd
import mysql2 from "mysql2/promise";
import enviroment from "../config/enviroment.js";

const { database } = enviroment;

const connection = mysql2.createPool({
    host: database.host,
    //name: database.name,
    user: database.user,
    password: database.password,
    database: database.name
});

export default connection;