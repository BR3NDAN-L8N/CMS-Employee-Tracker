const mysql = require("mysql");
const secret = require('../classified/secret');
const index = require("../index");
const SQL = require("./SQL");
const inquirer = require("inquirer");

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
        return `'${answer.firstName}', '${answer.lastName}', '${roleID}', ${managerID}`;
    });
}

function getNewDepartmentData() {
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                type: "input",
                message: "Enter new department name. **REQUIRED**",
                name: "departmentName",
                validate: function (input) {
                    str = input.toString();
                    if (str.length < 3) {
                        return "You must enter a department name.";
                    }
                    return true;
                },
            }
        ]).then(function (answer) {
            resolve(`'${answer.departmentName}'`);

        });
    });

}
//  INSERT INTO `Employees_DB`.`roles` (`title`, `salary`, `department_id`) VALUES ('Developer', '60000', '1');

async function getNewRoleData() {
    answer = await inquirer.prompt([
        {
            type: "input",
            message: "Enter new job title. **REQUIRED**",
            name: "jobTitle",
            validate: function (input) {
                str = input.toString();
                if (str.length < 2) {
                    return "You must enter a department name.";
                }
                return true;
            },
        },
        {
            type: "input",
            message: "Enter new job's yearly salary'. **REQUIRED**",
            name: "salary",
            validate: function (input) {
                str = input.toString();
                if (str.length < 4) {
                    return "You must enter a number greater than 4 digits... don't be a cheapskate.";
                }
                return true;
            },
        },
    ]);
    return departmentID = await getAllDepartments()
        .then(function (departmentID) {
            return `'${answer.jobTitle}', '${answer.salary}', '${departmentID}'`;
        });
}

function getAllDepartments() {

    return new Promise((resolve, reject) => {

        SQL.connection.query(`SELECT * FROM Employees_DB.departments`, function (err, res) {
            const departmentList = res.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            inquirer.prompt([{
                type: "list",
                name: "departmentName",
                message: "pick a department",
                choices: departmentList
            }]).then(function (answer) {
                console.log('department ID selected, ', answer.departmentName);
                resolve(answer.departmentName);
            })
        });
    });
}

function getAllManagers() {

    return new Promise((resolve, reject) => {

        SQL.connection.query(`SELECT * FROM Employees_DB.employees`, function (err, res) {
            const managerList = res.filter(function (employee) {
                return employee.role_id == 1;
            });
            const mappedManagerList = managerList.map(({ first_name, last_name, id }) => ({
                name: `${first_name} ${last_name}`,
                value: `${id}`
            }));
            mappedManagerList.splice(0, 0, { name: 'None', value: null });
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

module.exports = {
    getNewEmployeeData,
    getNewDepartmentData,
    getNewRoleData
};