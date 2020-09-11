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


async function determineTableQuery(tableName) {
    console.log(`ran function, determineTableQuery(${tableName})`);
    let values, params;
    if (tableName === "employees") {
        values = await getNewEmployeeData();
        params = `first_name, last_name, role_id, manager_id`;
    } else if (tableName === "departments") {
        values = getNewDepartmentData();
    } else {
        values = getNewRoleData();
    }
    return query = `INSERT INTO Employees_DB.${tableName} (${params}) VALUES(${values})`;
    // console.log('query ===', query);

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

function getAllManagers() {

    return new Promise((resolve, reject) => {

        connection.query(`SELECT * FROM Employees_DB.employees`, function (err, res) {
            const managerList = res.filter(function (employee) {
                return employee.role_id == 1;
            });
            const mappedManagerList = managerList.map(({ first_name, last_name, id }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            inquirer.prompt([{
                type: "list",
                name: "managerName",
                message: "pick a manager",
                choices: mappedManagerList
            }]).then(function (data) {
                console.log('manager ID selected, ', data.managerName);
                resolve(data.managerName);
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
                if (str.length < 3) {
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
                if (str.length < 3) {
                    return "You must enter a last name";
                }
                return true;
            },
        },
    ]);

    const roleID = await getAllDepartments();
    return managerID = await getAllManagers().then(function (managerID) {
        return `'${answer.firstName}', '${answer.lastName}', '${roleID}', '${managerID}'`;
    });


    //     return employeeData = getAllDepartments().then((roleID) => {
    //         console.log(`The string of values being returned from getNewEmployeeData() '${answer.firstName}', '${answer.lastName}', '${roleID}'`);
    //         return `'${answer.firstName}', '${answer.lastName}', '${roleID}'`;
    // });

}