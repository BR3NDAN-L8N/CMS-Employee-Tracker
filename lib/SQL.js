const mysql = require("mysql");
const secret = require('../classified/secret');

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: secret,
    database: "Employees_DB"
});

module.exports = {
    connection
}