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
    db.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table(res);
        questionDisplay();
    });
}

const viewAllRoles = () => {
    db.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        console.table(res);
        questionDisplay();
    })
}

const viewAllEmployees = () => {
    db.query("SELECT employee.id AS 'id', employee.first_name, employee.last_name, role.title, department.name AS 'department', role.salary, CONCAT (manager.first_name,' ', manager.last_name) AS 'manager name' FROM employee JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.department_id LEFT JOIN employee AS manager ON employee.manager_id = manager.id ORDER BY employee.id ASC", (err, res) => {
        if (err) throw err;
        console.table(res);
        questionDisplay();
    })
}

const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the department you would like to add?"
        }
    ]).then(function(res) {
        db.query("INSERT INTO department SET ?", {
            name: res.name
        },
        function(err, res) {
            if (err) throw err;
            console.table(res);
            questionDisplay();
        }
        )
    })
}

const addRole = () => {
    db.query(`SELECT * roles.title, roles.salary FROM role`, function(err, res) {
    inquirer.prompt([
        {
            type: "input",
            name: "roleName",
            message: "What role would you like to add?"
        },
        {
            type: "input",
            name: "roleSalary",
            message: "What is the salary for this role?"
        },
    ]).then(function(res) {  
        db.query("INSERT INTO role SET ?", {
            title: res.roleName,
            salary: res.roleSalary,
        }, 
        function(err, res) {
            if (err) throw err;
            console.table(res);
            questionDisplay();
        })
    }) 
});
}


const addEmployee = () => {
    db.query("SELECT * FROM role", (err, res) => {
        const roles = res.map((role) => {
            return {
                name: role.title,
                value: role.id
            }
        })   
    db.query("SELECT * FROM employee", (err, res) => {
        const manager = res.map((employee) => {
            return {
                name: employee.first_name + " " + employee.last_name,
                value: employee.role_id,
            }
        })
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?",
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?",
        }, 
        {
            type: "list",
            name: "employeeRole",
            message: "What is the employee's role?",
            choices: roles,
        },
        {
            type: "list",
            name: "employeeManager",
            message: "Who is the employee's manager?",
            choices: manager,
        },
    ]).then(function(res) {
        db.query("INSERT INTO employee SET ?", {
            first_name: res.firstName,
            last_name: res.lastName,
            role_id: res.employeeRole,
            manager_id: res.employeeManager,
        },
        function(err, res) {
            if (err) throw err;
            console.table(res);
            questionDisplay();
        })
    })
})
})
}
    


const updateEmployeeRole = () => {
    db.query("SELECT * FROM role", (err, res) => {
        const roles = res.map((role) => {
            return {
                name: role.title,
                value: role.id
            }
        })   
    db.query("SELECT * FROM employee", (err, res) => {
        const employee = res.map((employee) => {
            return {
                name: employee.first_name + " " + employee.last_name,
                value: employee.id,
            }
        })
    inquirer.prompt([
        {
            type: "list",
            name: "employeeList",
            message: "Whose role would you like to update?",
            choices: employee,
        },
        {
            type: "list",
            name: "updatedRole",
            message: "What new role would you like to give this employee?",
            choices: roles,
        },
    ]).then(function(res) {
        db.query(`UPDATE employee SET role_id = ${res.updatedRole} WHERE employee.id = ${res.employeeList}`,
    function(err, res) {
        if (err) throw err;
        console.table(res);
        questionDisplay();
    })
})
    })
})
}



