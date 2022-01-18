const Employee = require('./Employee');

class Role extends Employee { 

    constructor(title, salary, departmentId) {
        // call parent constructor here:
        super(first_name, last_name, roleId, managerId);
        this.title = title;
        this.salary = salary;
        this.departmentId = departmentId;
        
    }

    getTitle() {
        return this.title;
    }

    getSalary() {
        return this.salary;
    }

    getDepartmentId() {
        return this.departmentId;
    }


}

module.exports = Role;