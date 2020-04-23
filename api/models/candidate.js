const mongoose = require('mongoose');
const  candidateSchema = require('../schemas/candidate');

class Interview{
    constructor(){
        this.model = mongoose.model('Candidate', candidateSchema)
    }
    
    async save(candidateObj){
        return this.model.create(candidateObj);
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
module.exports = new Interview();