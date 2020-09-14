const mysql = require("mysql");
const inquirer = require("inquirer");
const SQL = require("./SQL");
const PROMPT = require("./prompt");

function mainMenu() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do? Scroll down for more options.",
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
                // console.log(`ran function, addToTable(${choice[1]})`);
                addToTable(choice[1]);
            } else if (choice[0] === 'update') {
                updateRole();
            } else {
                console.log(`The answer of, ${choice}, was not recognized`);
            }
        });
}

async function updateRole() {
    const query = await PROMPT.getUpdateEmployeeRoleData();
    runQuery(query);
}

function viewTable(tableName) {
    const query = `SELECT * FROM Employee_DB.${tableName}`;

    SQL.connection.query(query, function (err, res) {
        console.table(res);
        mainMenu();
    });
}

async function addToTable(tableName) {

    const query = await determineTableQuery(tableName);
    const run = await runQuery(query);
    run;

}

async function determineTableQuery(tableName) {
    // console.log(`ran function, determineTableQuery(${tableName})`);
    let values, params;
    if (tableName === "employees") {
        values = await PROMPT.getNewEmployeeData();
        params = `first_name, last_name, role_id, manager_id`;
    } else if (tableName === "departments") {
        values = await PROMPT.getNewDepartmentData();
        params = 'name';
    } else {
        values = await PROMPT.getNewRoleData();
        params = `title, salary, department_id`;
    }
    return query = `INSERT INTO Employee_DB.${tableName} (${params}) VALUES(${values})`;

}

function runQuery(query) {
    SQL.connection.query(query, function (err, res) {
        // console.log(`this is the response from the query ran on addToTable() with the query of ${query} ... and this is the response,`, res);
        console.log('** CHANGES MADE SUCCESSFULLY **');
        mainMenu();
    });
}

module.exports = {
    viewTable,
    mainMenu
};