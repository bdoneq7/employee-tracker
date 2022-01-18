// Include Packages
const inquirer = require('inquirer');
const mysql = require('mysql2');
require("console.table");
const db = require('./db/connection');

// Include Classes from Library
const Manager = require('./lib/Department');
const Engineer = require('./lib/Employee');
const Intern = require('./lib/Role'); 

// Main Menu Prompt Function
const employeeManagerMenu = () => {

    return inquirer.prompt ([
        {
            type: 'list',
            name: 'menu',
            message: "Welcome to Employee Manager: What would you like to do?",
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
            
        },
        

    ]).then(choice => {
        switch(choice.menu) {
            case "View All Employees":
                return viewAllEmployees();
                break;
            case "Add Employee":
                return addEmployee();
                break;
            case "Update Employee Role":
                return updateEmployeeRole();
                break;
            case "View All Roles":
                return viewAllRoles();
                break;
            case "Add Role":
                return addRole();
                break;
            case "View All Departments":
                return viewAllDepartments();
                break;
            case "Add Department":
                return addDepartment();
                break;
            case "Quit":
                break;    
        }
    });
}

// View All Employees Function
function viewAllEmployees() {
    console.log("Viewing All Employees\n");

    var query =
      `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN role r
      ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    LEFT JOIN employee m
      ON m.id = e.manager_id`
  
    db.query(query, function (err, res) {
      if (err) throw err;
  
      console.table(res);
      console.log("All Employees have been Viewed\n");
  
      employeeManagerMenu();
    });
}
    


// Add Employee Function
function addEmployee() {

    
    
};

// Update Employee Role Function
function updateEmployeeRole() {
    
    
};

// View All Roles Function
function viewAllRoles() {
    console.log("Viewing All Roles\n");

    var query =
      `SELECT * FROM role;`
  
    db.query(query, function (err, res) {
      if (err) throw err;
  
      console.table(res);
      console.log("All Roles have been Viewed\n");
  
      employeeManagerMenu();
    });
    
    
};
    

// Add Role Function
function addRole() {
    
    
};

// View All Departments Function
function viewAllDepartments() {
    console.log("Viewing All Departments\n");

    var query =
      `SELECT * FROM department;`
  
    db.query(query, function (err, res) {
      if (err) throw err;
  
      console.table(res);
      console.log("All Departments have been Viewed\n");
  
      employeeManagerMenu();
    });
    
    
};

// Add Department
function addDepartment() {
    
    
};


employeeManagerMenu();

