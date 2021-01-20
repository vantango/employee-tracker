const inquirer = require("inquirer");
const mysql = require("mysql");
require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employees_db"
})

connection.connect(function (err) {
    if (err) throw err
    console.log("connected as id" + connection.threadId + "\n");
    start();
})

function start() {
    console.log("Welcome to the Employee Tracker!" + "\n");
    inquirer.prompt([{
        type: "list",
        name: "userChoice",
        message: "What would you like to do?",
        choices: [
            "Add Department",
            "Add Role",
            "Add Employee",
            "View all Departments",
            "View all Roles",
            "View all Employees",
            "Update employee roles",
            "Exit"
        ]
    }]).then(res => {
        console.log(res);
        switch (res.userChoice) {
            case "Add Department":
                addDept()
                break;
            case "Add Role":
                addRole()
                break;
            case "Add Employee":
                addEmp()
                break;
            case "View all Departments":
                viewDept()
                break;
            case "View all Roles":
                viewRole()
                break;
            case "View all Employees":
                viewEmp()
                break;
            case "Update employee roles":
                updateEmp()
                break;
            case "Exit":
                console.log("Goodbye");
                process.exit();
                break;
        };
    })
}