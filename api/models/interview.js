const mongoose = require('mongoose');
const  interviewSchema = require('../schemas/interview');

class Interview{
    constructor(){
        this.model = mongoose.model('Interview', interviewSchema)
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
module.exports = new Interview();