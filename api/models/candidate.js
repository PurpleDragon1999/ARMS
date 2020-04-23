const schema = require('../schemas');
const mongoose = require('mongoose');
const candidateSchema = new mongoose.Schema(schema.candidate, { versionKey: false });
candidateSchema.set('toObject', { getters: true });

class Candidate{
    constructor(){
        this.Model = mongoose.model('Candidate', candidateSchema);
    }

    async getAll(criteria={}, columns={}){
        console.log("inside candidate getAll")
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

module.exports = new Candidate();