const Base = require('./base');
const employeeModel = require('../models/employee');

class Employee extends Base {
    constructor(){ 
        super(employeeModel); 
    }
}

module.exports = new Employee();