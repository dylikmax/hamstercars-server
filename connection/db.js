import mysql from "mysql2";
import MYSQL_SETTINGS from "./mysql-settings.js";

const connection = mysql.createConnection(MYSQL_SETTINGS);

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the MySQL database.");
});

export default connection;