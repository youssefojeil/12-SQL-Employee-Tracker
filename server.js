// import express & mysql2
const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");

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
//setup query to view department
let sql = `SELECT * FROM department`;
db.query(sql, (err, results) => {
  if (err) {
    res.status(500).json({ error: err.message });
     return;
  }
  else {
    console.table(results);
  }
});

/*
connection.query('SELECT * FROM `books` WHERE `author` = ?', ['David'], function (error, results, fields) {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
  });
*/
/*
//setup query to view roles
sql = `SELECT * FROM roles`;
db.query(sql, (err, results) => {
  if (err) {
    res.status(500).json({ error: err.message });
     return;
  }
  else {
    console.table(results);
  }
});

//setup query to view employee
sql = `SELECT * FROM employee`;
db.query(sql, (err, results) => {
  if (err) {
    res.status(500).json({ error: err.message });
     return;
  }
  else {
    console.table(results);
  }
});
*/
const menuQuestions = [
    {
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: ["View All Employees", 
            "Add Employee", 
            "Update Employee Role",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Quit"
        ]
    }
];

/*** INQUIRER***/
function mainMenu() {
    inquirer.prompt(menuQuestions).then((answers) => {
        console.log(answers.menu);
        if(answers.menu === "View All Employees") {
            //viewEmployees();
        }
        else if(answers.menu === "Add Employee") {
            //addEmployee();
        }
        else if(answers.menu === "Update Employee Role") {
            //updateEmployeeRole();
        }
        else if(answers.menu === "Add Role") {
            //addRole();
        }
        
        else if(answers.menu === "View All Departments") {
            //viewDepartments();
        }
        else if(answers.menu === "Add Department") {
            //addDepartment();
        }
        else{
            return;
        }
    });    
}

mainMenu();

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

