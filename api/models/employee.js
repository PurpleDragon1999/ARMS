const schema = require('../schemas');
const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema(schema.employee, { versionKey: false });
employeeSchema.set('toObject', { getters: true });

class Employee{
    constructor(){
        this.Model = mongoose.model('Employee', employeeSchema);
    }

    async getAll(criteria={}, columns={}){
        return this.Model.find(criteria, columns).sort({"name": 1});
    }

    async get(id){
        return this.Model.findOne({ _id: id });
    }

    async modify(id, data){
        return this.Model.findByIdAndUpdate(id, { $set: data }, {new:true});
    }

    async save(data){
        return this.Model.create(data);
    }

    async remove(id){
        return this.Model.deleteOne({ _id: id });
    }
}

module.exports = new Employee();