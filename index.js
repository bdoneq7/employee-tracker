
// Include Npm Inquirer
const inquirer = require('inquirer');

// Include Classes from Library
const Manager = require('./lib/Department');
const Engineer = require('./lib/Employee');
const Intern = require('./lib/Role');

// Create Employee array
const employeeArray = []; 

// Ask Manager Questions via Inquirer
const managerSetup = () => {

    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name', // key and user input
            message: 'Who is the Team Manager Name?', // Manager Name
            validate: teamManagerInput => {
                if (teamManagerInput) {
                    return true;
                } else {
                    console.log ("Error: Please enter the Team Manager Name");
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Please enter the Manager ID", // Manager ID
            validate: managerIdInput => {
                if (managerIdInput) {
                    return true;
                } else {
                    console.log('Error: Please enter the Manager ID');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter the Manager Email Address", // Manager Email
            validate: managerEmailInput => {
                if (managerEmailInput) {
                    return true;
                } else {
                    console.log('Error: Please enter a Manager Email Address');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "Please enter the Manager Office Number", // Manager Office #
            validate: officeNumberInput => {
                if (officeNumberInput) {
                    return true;
                } else {
                    console.log('Error: Please enter the Manager office');
                    return false;
                }
            }
        }
    ])

    .then(managerInfo => {
        const  { name, id, email, officeNumber } = managerInfo; 
        const manager = new Manager (name, id, email, officeNumber);

        employeeArray.push(manager); 
        console.log(manager); 
    })
};

const employeeSetup = () => {

    return inquirer.prompt ([
        {
            type: 'list',
            name: 'role',
            message: "Please enter the Employee Role", // Employee Role
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: "Please enter the Employee Name", // Employee Name
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("Error: Please enter the Employee Name");
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Please enter the Employee ID", // Employee ID
            validate: employeeIDInput => {
                if (employeeIDInput) {
                    return true;
                } else {
                    console.log ("Error: Please enter the Employee ID");
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter the Employee Email Address", // Employee Email
            validate: employeeEmailInput => {
                if (employeeEmailInput) {
                    return true;
                } else {
                    console.log ("Error: Please enter the Employee Email Address");
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: "Please enter the Employee Github Username", // Employee Github
            when: (input) => input.role === "Engineer",
            validate: nameInput => {
                if (nameInput ) {
                    return true;
                } else {
                    console.log ("Error: Please enter the Employee Github Username")
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: "Please enter the Intern School", // Intern School
            when: (input) => input.role === "Intern",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("Error: Please enter the Intern School")
                }
            }
        },
        {
            type: 'confirm',
            name: 'addMoreEmployees',
            message: 'Do you want to add more Employees?', // Add more Employees?
            default: false
        }
    ])
    .then(employeeInfo => {

        let { name, id, email, role, github, school, addMoreEmployees } = employeeInfo; 
        let employee; 

        if (role === "Engineer") {
            employee = new Engineer (name, id, email, github);

            console.log(employee);

        } else if (role === "Intern") {
            employee = new Intern (name, id, email, school);

            console.log(employee);
        }

        employeeArray.push(employee); 

        if (addMoreEmployees) {
            return employeeSetup(employeeArray); 
        } else {
            return employeeArray;
        }
    })

};


managerSetup()
  .then(employeeSetup)
  .then(employeeArray)
  .catch(err => {
 console.log(err);
  });