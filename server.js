// import express & mysql2
const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");

// global vars
let depListArr = [];
let roleListArr = [];

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
        choices: depListArr
    }
];

const departmentQuestions = [
    {
        type: "input",
        name: "departmentName",
        message: "What is the name of the department?"
    }
];

const employeeQuestions = [
    {
        type: "input",
        name: "fName",
        message: "What is the employee's first name?"
    },
    {
        type: "input",
        name: "lName",
        message: "What is the employee's last name?"
    },
    {
        type: "list",
        name: "roles",
        message: "What is the employee's role?",
        choices: roleListArr
    },

]

/*** MAIN INQUIRER***/
function mainMenu() {
    inquirer.prompt(menuQuestions).then((answers) => {
        if(answers.menu === "View All Employees") {
            viewEmployees();
        }
        else if(answers.menu === "Add Employee") {
            addEmployee();
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


// get current departments from database to use in add role function
// helper function for addrole function
function departmentsList() {
    //setup query to view departments
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, results) => {
    if (err) {
        console.log(err.message);
        return;
    }
    // push individual departments into depListArr array
    else {
        for(let i = 0; i < results.length; i ++) {
            depListArr.push(results[i].name);
        }
        return depListArr;
    }
    });
}

// view all departments function
function viewDepartments() {
    //setup query to view department
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, results) => {
    if (err) {
        console.log(err.message);
        mainMenu();
    }
    else {
        console.table(results);
        mainMenu();
    }
    });
    
}

// view employees function
function viewEmployees() {
    //setup query to view employees
    const sql = `
    SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, roles.title, roles.salary, roles.department_id, department.name FROM employee JOIN roles  ON employee.role_id = roles.id JOIN department ON employee.role_id = department.id`;
    db.query(sql, (err, results) => {
    if (err) {
        console.log(err.message);
        mainMenu();
    }
    // log results on success
    else {
        console.table(results);
        mainMenu();
    }
    });
    
}

// Helper function for addemployee function
// View roles function
function rolesList() {
    //setup query to view roles
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, results) => {
    if (err) {
        console.log(err.message);
        return;
    }
    // push individual roles into roleListArr array
    else {
        for(let i = 0; i < results.length; i ++) {
            roleListArr.push(results[i].title);
        }
        return roleListArr;
    }
    });
}

// View roles function
function viewRoles() {
    //setup query to view roles
    sql = `SELECT  roles.id, roles.title, roles.department_id, department.name, roles.salary FROM roles JOIN department ON roles.department_id = department.id`;
    db.query(sql, (err, results) => {
    if (err) {
        console.log(err.message);
        return;
    }
    // log results on success
    else {
        console.table(results);
        mainMenu();
    }
    });
   
}

// Add Employee function
function addEmployee() {
    // get current roles in db
    rolesList();
    // declare roleid
    let roleID = 0;
    inquirer.prompt(employeeQuestions).then((answers) => {
        //log results from user input
        console.log(roleListArr);
        console.log(answers.fName);
        console.log(answers.lName);
        console.log(answers.roles);

        //get role id by looping through list of dep
        for(let i = 0; i < roleListArr.length; i ++) {
            // if the answer matches any of the roles in list
                // role id = index + 1 of role in list
             if(roleListArr[i] === answers.roles) {
                console.log(roleListArr[i]);
                console.log(answers.roles);
                roleID = i + 1;
                console.log(roleID);
             }
        }

        const sql = `INSERT INTO employee SET ?`
        const params = {first_name: answers.fName, 
                        last_name: answers.lName,
                        role_id: roleID
                    };
        console.log(params);
        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(err.message);
                mainMenu();
            }
            else {
                console.table(result);
                // reset department list to empty array 
                roleListArr = []
                // call main menu
                mainMenu();
            }        
        });
    });

}

// Add department function
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
            // log results on success 
            else {
                console.table(result);
                mainMenu();
            }        
        })
    });
   
}

// add role function
function addRole() {
    //get list of current departments
    departmentsList();
    // set depID index
    let depID = 0;
    inquirer.prompt(roleQuestions).then((answers) => {
        //log results from input
        console.log(answers.roleName);
        let salary = parseInt(answers.roleSalary);
        console.log(salary);
        console.log(answers.departments);
        console.log(depListArr);

        //get department id by looping through list of dep
        for(let i = 0; i < depListArr.length; i ++) {
            // if the answer matches any of the departments in list
                // dep id = index + 1 of department in list
             if(depListArr[i] === answers.departments) {
                console.log(depListArr[i]);
                console.log(answers.departments);
                depID = i + 1;
                console.log(depID);
             }
        }

        const sql = `INSERT INTO roles SET ?`
        const params = {title: answers.roleName, 
                        salary: salary,
                        department_id: depID
                    };
        console.log(params);
        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(err.message);
                mainMenu();
            }
            else {
                console.table(result);
                // reset department list to empty array 
                depListArr = []
                // call main menu
                mainMenu();
            }        
        });
    });
    
}
    

mainMenu();



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

