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
            "Add new Department",
            "Add new Role",
            "Add new Employee",
            "View all Departments",
            "View all Roles",
            "View all Employees",
            "Update employee roles",
            "Exit"
        ]
    }]).then(res => {
        switch (res.userChoice) {
            case "Add new Department":
                addDept()
                break;
            case "Add new Role":
                addRole()
                break;
            case "Add new Employee":
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
    });
};

function viewDept() {
    console.log("View all depts");
    const sqlQuery = "SELECT * FROM department";
    connection.query(sqlQuery, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
};

function viewRole() {
    console.log("View all roles");
    const sqlQuery = "SELECT * FROM role";
    connection.query(sqlQuery, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
};

function viewEmp() {
    console.log("View all employees");
    const sqlQuery = "SELECT * FROM employee";
    connection.query(sqlQuery, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
};

function addDept() {
    console.log("Adding new Department");
    inquirer.prompt(
        {
            type: "input",
            message: "Please enter new department name: ",
            name: "department"
        }
    ).then(answer => {
        // console.log(choices.res);
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.department,
            },
            function (err, res) {
                if (err) {
                    throw err
                } else {
                    console.log("New Department added successfully!");
                    start();
                }
            });
    });
};

function addRole() {
    console.log("Adding new Role");
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter new title: ",
            name: "title"
        },
        {
            type: "input",
            message: "Please enter new salary: ",
            name: "salary"
        },
        {
            type: "input",
            message: "Please enter new department ID: ",
            name: "department_id"
        }
    ]
    ).then(answer => {
        // console.log(choices.res);
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.department_id
            },
            function (err, res) {
                if (err) {
                    throw err
                } else {
                    console.log("New Role added successfully!");
                    start();
                }
            });
    });
};

function addEmp() {
    console.log("Adding new Employee");
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter first name: ",
            name: "first_name"
        },
        {
            type: "input",
            message: "Please enter last name: ",
            name: "last_name"
        },
        {
            type: "input",
            message: "Please enter new role ID: ",
            name: "role_id"
        },
        {
            type: "input",
            message: "Please enter new manager ID: ",
            name: "manager_id"
        }
    ]
    ).then(answer => {
        // console.log(choices.res);
        if (answer.manager_id === "" || answer.manager_id === 0) {
            answer.manager_id = null
        }
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role_id,
                manager_id: answer.manager_id
            },
            function (err, res) {
                if (err) {
                    throw err
                } else {
                    console.log("New Employee added successfully!");
                    start();
                }
            });
    });
};

function updateEmp() {
    console.log("Update employee role");
    const sqlQuery = "SELECT * FROM employee";
    connection.query(sqlQuery, function (err, empResponse) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "list",
                name: "employeeName",
                message: "Which employee's role would you like to update?",
                choices: function () {
                    let choiceArray = []
                    empResponse.forEach(employee => {
                        let name = employee.first_name + " " + employee.last_name
                        let value = employee.id
                        choiceArray.push({ name, value })
                    })
                    return choiceArray;
                }
            },
            {
                type: "input",
                message: "Please enter new employee role ID",
                name: "role_id"
            }
        ]
        ).then(answer => {
            console.log(answer);
            const sqlQuery = "Update Employee SET ? WHERE ?"
            connection.query(sqlQuery, [
                {
                    role_id: answer.role_id
                },
                {
                    id: answer.employeeName
                }
            ],
                function (err, res) {
                    if (err) {
                        throw err
                    } else {
                        console.log("Updated Employee Role successfully!");
                        console.log(res.affectedRows);
                        start();
                    }
                });
        });
    });
};


