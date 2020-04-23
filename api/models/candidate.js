const mongoose = require('mongoose');
const candidateSchema = require('../schemas/candidate')

class Candidate{
    constructor(){
        this.model = mongoose.model('Candidate', candidateSchema)
    }
    
    async save(interviewObj){
        return this.model.create(interviewObj);
    }

    async findOne(criteria={}){
        return this.model.findOne(criteria);
    }

    async updateOne(criteria, updateObj){
        return this.model.updateOne(criteria, updateObj);
    }

    async deleteOne(criteria){
        return this.model.deleteOne(criteria);
    }
}
module.exports = new Candidate();