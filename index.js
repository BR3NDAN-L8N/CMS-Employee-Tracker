var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");
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
                "Add Employees",
                "Add Departments",
                "Add Roles",
                "Update an Employee's Role"
            ]
        })
        .then(function (answer) {
            const choice = answer.action.toLowerCase().split(' ');
            if (choice[0] === 'view') {
                viewTable(choice[1]);
            } else if (choice[0] === 'add') {
                console.log(`ran function, addToTable(${choice[1]})`);
                addToTable(choice[1]);
            } else if (choice[0] === 'update') {
                updateRole();
            } else {
                console.log(`The answers, ${choice}, weren't recognized`);
            }
        });

}

function viewTable(tableName) {
    const query = `SELECT * FROM Employees_DB.${tableName}`;

    connection.query(query, function (err, res) {
        console.table(res);
        run();
    });
}


function determineTableQuery(tableName) {
    console.log(`ran function, determineTableQuery(${tableName})`);
    return new Promise((resolve, reject) => {
        if (tableName === "employees") {
            const values = getNewEmployeeData();
            const params = `'first_name', 'last_name', 'role_id', 'manager_id'`;
            return values, params;
        } else if (tableName === "departments") {
            const values = getNewDepartmentData();
        } else {
            const values = getNewRoleData();
        }
        resolve(query = `INSERT INTO Employees_DB.${tableName} (${params}) VALUES(${values})`);
        console.log('query from determineTableQuery() resolves as such,', query);
    });

}

function runQuery(query) {
    connection.query(query, function (err, res) {
        console.log(`this is the response from the query ran on addToTable() with the query of ${query} ... and this is the response,`, res);
        run();
    });
}

async function addToTable(tableName) {

    const query = await determineTableQuery(tableName);
    const run = await runQuery(query);
    run;
    
}

function getAllDepartments() {

    return new Promise((resolve, reject) => {

        connection.query(`SELECT * FROM Employees_DB.departments`, function (err, res) {
            const departmentList = res.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            inquirer.prompt([{
                type: "list",
                name: "departmentName",
                message: "pick a department",
                choices: departmentList
            }]).then(function (data) {
                console.log('department ID selected, ', data.departmentName);
                resolve(data.departmentName);
            })
        });
    });
}

async function getNewEmployeeData() {

    answer = await inquirer.prompt([
        {
            type: "input",
            message: "Enter employees FIRST name. **REQUIRED**",
            name: "firstName",
            validate: function (input) {
                str = input.toString();
                if (str.length < 1) {
                    return "You must enter a first name";
                }
                return true;
            },
        },
        {
            type: "input",
            message: "Enter employees LAST name. **REQUIRED**",
            name: "lastName",
            validate: function (input) {
                str = input.toString();
                if (str.length < 1) {
                    return "You must enter a last name";
                }
                return true;
            },
        },
    ]);

    return employeeData = getAllDepartments().then((roleID) => {
        console.log(`The string of values being returned from getNewEmployeeData() '${answer.firstName}', '${answer.lastName}', '${roleID}'`);
        return `'${answer.firstName}', '${answer.lastName}', '${roleID}'`;
    });

}