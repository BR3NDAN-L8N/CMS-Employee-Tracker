const mysql = require("mysql");
const consoleTable = require("console.table");
const PROMPTS = require("./lib/prompt");
const VIEW = require("./lib/view");
const SQL = require("./lib/SQL");


SQL.connection.connect(function (err) {
    if (err) throw err;
    run();
});

function run() {
    VIEW.mainMenu();
}

module.exports = {
    run
};
