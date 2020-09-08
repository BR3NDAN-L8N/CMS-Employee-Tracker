var mysql = require("mysql");
var inquirer = require("inquirer");
const secret = require('./classified/secret');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: secret,
    database: "Employees_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    run();
});

function run() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View Employees",
                "View Departments",
                "View Roles",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update an Employee's Role"
            ]
        })
        .then(function (answer) {
            const choice = answer.action.toLowerCase().split(' ');
            if (choice[0] === 'view') {
                viewTable(choice[1]);
            } else if (choice[0] === 'add') {
                addToTable(choice[1]);
            } else {
                updateRole();
            }
        });
            
}


function viewTable(tableName) {
    const query = `SELECT * FROM Employees_DB.${tableName}`;

    connection.query(query, function (err, res) {
        console.log(res);
        run();
    });
}