import mysql from "mysql2/promise";
import MYSQL_SETTINGS from "./mysql-settings.js";

const connection = await mysql.createConnection(MYSQL_SETTINGS);
connection.config.namedPlaceholders = true;

console.log("Connected to the MySQL database.");

export default connection;
