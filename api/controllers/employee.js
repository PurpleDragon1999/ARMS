const Base = require('./base');
const model = require('../models');

class Employee extends Base {
    constructor(){ 
        super(model.employee); 
    }
}

module.exports = new Employee();