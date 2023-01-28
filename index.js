const inquirer = require("inquirer");
const consoleTable = require("console.table");
const db = require("./config/connection");

db.connect((err) => {
    if (err) throw err;
    console.log("Successful connection established!");
    questionDisplay();
});

const questionDisplay = async () => {
    inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "What would you like to do?",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update Employee Role",
                "Quit",
            ],
    }
])
    .then((res) => {
        switch (res.options) {
            case "View All Departments":
                viewAllDepartments();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "View All Employees":
                viewAllEmployees();
                break;
            case "Add a Department":
                addDepartment();
                break;
            case "Add a Role":
                addRole();
                break;
            case "Add an Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "Quit":
                db.end();
                console.log("\n Thanks for using the employee tracker. Goodbye! \n");
                return;
            default:
                break;
        }
    })
}

const viewAllDepartments = () => {
}

const viewAllRoles = () => {

}

const viewAllEmployees = () => {

}

const addDepartment = () => {

}

const addRole = () => {

}

const addEmployee = () => {

}

const updateEmployeeRole = () => {

}



questionDisplay();