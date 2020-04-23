const schema = require('../schemas');
const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema(schema.employee, { versionKey: false });
employeeSchema.set('toObject', { getters: true });

class Employee{
    constructor(){
        this.Model = mongoose.model('Employee', employeeSchema);
    }

    async get(id){
        return this.Model.findOne({ _id: id });
    }

    async getAll(){
        return this.Model.find({});
    }

    async modify(id, data){
        return this.Model.findByIdAndUpdate(id, { $set: data }, { new: true, useFindAndModify: false });
    }

    async save(data){
        return this.Model.create(data);
    }

    async remove(id){
        return this.Model.deleteOne({ _id: id });
    }

    async getByCriteria(criteria){
        return this.Model.findOne(criteria);
    }
}

module.exports = new Employee();