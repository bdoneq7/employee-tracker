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
            choices: ['View All Employees', // Working
            'Add Employee', // Working
            'Update Employee Role', 
            'View All Roles', // Working
            'Add Role', 
            'View All Departments', // Working
            'Add Department', 
            'Quit'] // Working
            
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

    
        console.log("Adding an Employee")
      
        var query =`SELECT r.id, r.title, r.salary FROM role r`
      
        db.query(query, function (err, res) {
          if (err) throw err;
      
          const roleChoices = res.map(({ id, title, salary }) => ({
            value: id, title: `${title}`, salary: `${salary}`
          }));
      
          console.table(res);
          console.log("Enter New Employee Info");
      
          employeeInfo(roleChoices);
        });
      
        function employeeInfo(roleChoices) {

            inquirer
              .prompt([
                {
                  type: "input",
                  name: "first_name",
                  message: "What is the Employee First Name?"
                },
                {
                  type: "input",
                  name: "last_name",
                  message: "What is the Employee Last Name?"
                },
                {
                  type: "list",
                  name: "roleId",
                  message: "What is the Employee Role?",
                  choices: roleChoices
                },
                {
                  type: "input",
                  name: "managerId",
                  message: "What is the Employee Manager ID?",
                
                }
              ])
              .then(function (answers) {
                console.log(answers);
          
                var query = `INSERT INTO employee SET ?`
                
                db.query(query,
                  {
                    first_name: answers.first_name,
                    last_name: answers.last_name,
                    role_id: answers.roleId,
                    manager_id: answers.managerId,
                  },
                  function (err, res) {
                    if (err) throw err;
          
                    console.table(res);
                    console.log("New Employee Added\n");
          
                    employeeManagerMenu();
                  });
                
              });
          }
    
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
    
    var query =
    `SELECT r.id, r.title, r.salary FROM role r`

  db.query(query, function (err, res) {
    if (err) throw err;

    roleChoices = res.map(({ id, title, salary }) => ({
        value: id, title: `${title}`, salary: `${salary}`      
      }));

    console.table(res);

    addEmployeeRole(roleChoices);
  });

  function addEmployeeRole(roleChoices) {

    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the Role Title?"
        },
        {
          type: "input",
          name: "salary",
          message: "What is the Role Salary?"
        },
        {
          type: "list",
          name: "departmentId",
          message: "What is the Department Id?",
          choices: roleChoices
        },
      ])
      .then(function (answers) {
  
        var query = `INSERT INTO role SET ?`
  
        db.query(query, {
          title: answers.title,
          salary: answers.salary,
          department_id: answers.departmentId
        },
          function (err, res) {
            if (err) throw err;
  
            console.table(res);
            console.log("New Role Added");
  
            employeeManagerMenu();
          });
  
      });
  }
    
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

    
        return inquirer.prompt ([
            {
                type: 'input',
                name: 'dept',
                message: "What is the name of the department?",
                validate: deptInput => {
                    if (deptInput) {
                        return true;
                    } else {
                        console.log ("Error: Please enter the Department name");
                        return false; 
                    }
                }
                
            }

        ]);   
        
        var query =
      `INSERT INTO department`
  
    db.query(query, function (err, res) {
      if (err) throw err;
  
      console.table(res);
      console.log("Department has been added!\n");
  
      employeeManagerMenu();
    });
    
};


employeeManagerMenu();

