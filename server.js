// import express & mysql2
const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
let department_list = [];
// set up port
const PORT = process.env.PORT || 3000;
// invoke express
const app = express();

// Setup Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      password: 'rootroot',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
    
  );

/*** QUERIES ***/
/*


/*
connection.query('SELECT * FROM `books` WHERE `author` = ?', ['David'], function (error, results, fields) {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
  });
*/
/*

*/
const menuQuestions = [
    {
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: ["View All Employees", 
            "Add Employee", 
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Quit"
        ]
    }
];

const roleQuestions = [
    {
        type: "input",
        name: "roleName",
        message: "What is the name of the role?"
    },
    {
        type: "input",
        name: "roleSalary",
        message: "What is the salary of the role?"
    },
    {
        type: "list",
        name: "departments",
        choices: department_list
    }
];

const departmentQuestions = [
    {
        type: "input",
        name: "departmentName",
        message: "What is the name of the department?"
    }
];

/*** INQUIRER***/
function mainMenu() {
    inquirer.prompt(menuQuestions).then((answers) => {
        console.log(answers.menu);
        if(answers.menu === "View All Employees") {
            viewEmployees();
        }
        else if(answers.menu === "Add Employee") {
            //addEmployee();
        }
        else if(answers.menu === "Update Employee Role") {
            //updateEmployeeRole();
        }
        else if(answers.menu === "Add Role") {
            addRole();
        }
        
        else if(answers.menu === "View All Roles") {
            viewRoles();
        }
        
        else if(answers.menu === "View All Departments") {
            viewDepartments();
        }
        else if(answers.menu === "Add Department") {
            addDepartment();
        }
        else{
            return;
        }
    });    
}




mainMenu();

departments();




// get current departments from database to use in add role function
function departments() {
    //setup query to view departments
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, results) => {
    if (err) {
        console.log(err.message);
        return;
    }
    // push individual departments into department_list array
    else {
        for(let i = 0; i < results.length; i ++) {
            department_list.push(results[i].name);
        }
    }
    });
    mainMenu();
}

function viewDepartments() {
    //setup query to view department
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, results) => {
    if (err) {
        console.log(err.message);
        return;
    }
    else {
        console.log(results);
        console.table(results);
    }
    });
    mainMenu();
}

function viewEmployees() {
    //setup query to view employee
    const sql = `
    SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, roles.title, roles.salary, roles.department_id, department.name FROM employee JOIN roles  ON employee.role_id = roles.id JOIN department ON employee.role_id = department.id`;
    db.query(sql, (err, results) => {
    if (err) {
        console.log(err.message);
        return;
    }
    else {
        console.table(results);
    }
    });
    mainMenu();
}

// job title, role id, department & salary
function viewRoles() {
    //setup query to view roles
    sql = `SELECT  roles.id, roles.title, roles.department_id, department.name, roles.salary FROM roles JOIN department ON roles.department_id = department.id`;
    db.query(sql, (err, results) => {
    if (err) {
        console.log(err.message);
        return;
    }
    else {
        console.table(results);
    }
    });
    mainMenu();
}

function addDepartment() {

    inquirer.prompt(departmentQuestions).then((answer) => {
        console.log(answer.departmentName);
        const sql = `INSERT INTO department (name) VALUES (?)`
        const params = answer.departmentName;
        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(err.message);
                return;
            }
            else {
                console.table(result);
            }        
        })
    });
    mainMenu();
}

function addRole() {
    inquirer.prompt(roleQuestions).then((answers) => {
        console.log(answers.roleName);
        let salary = parseInt(answers.roleSalary);
        console.log(salary);
        console.log(answers.departments);
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES ?`
        const params = [answers.roleName, salary];
        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(err.message);
                return;
            }
            else {
                console.table(result);
            }        
             })
    });
    mainMenu();
}
    


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

