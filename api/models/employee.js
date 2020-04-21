const mongoose = require("mongoose")
const employeeSchema = require('../schemas/employee');


class Employee{
    constructor(){
        this.model = mongoose.model('Employee', employeeSchema)
    }

    async get(criteria={}, columns={}){
        return await this.model.find(criteria, columns).sort({"name": 1});
    }

}

module.exports = new Employee();