const mongoose = require('mongoose');
const roundSchema = require('../schemas/round');

class Round{
    constructor(){
        this.model = mongoose.model('round', roundSchema);
    }

    async save(obj){
        return this.model.create(obj);
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

module.exports = new Round();