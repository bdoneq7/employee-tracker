const Employee = require('./Employee');

class Department extends Employee { 

    constructor(name) {
        // call parent constructor here:
        super(first_name, last_name, roleId, managerId);
        this.name = name;
    }

    getName() {
        return this.name;
    }

}

module.exports = Department;