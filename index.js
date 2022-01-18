// Include Packages
const inquirer = require('inquirer');
const mysql = require('mysql2');
require("console.table");

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
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
            
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
        }
    });
}

// View All Employees Function
function viewAllEmployees() {

    
    const sql = `SELECT * FROM employee`;
    
    db.query(sql, (err, rows) => { // db is not defined?
        if (err) {
            res.sendStatus(500).json({ error: err.message });
        }
        res.json ({
            message: 'success',
            data: rows
        });
    });

    employeeManagerMenu();
}
    


// Add Employee Function
function addEmployee() {

    
    
};

// Update Employee Role Function
function updateEmployeeRole() {
    
    
};

// View All Roles Function
function viewAllRoles() {
    
    
};
    

// Add Role Function
function addRole() {
    
    
};

// View All Departments Function
function viewAllDepartments() {
    
    
};

// Add Department
function addDepartment() {
    
    
};


employeeManagerMenu();

