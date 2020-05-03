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

    async index(criteria = {}, columns = {}) {
        return this.model.find(criteria, columns);
      }

    async get(criteria={}, columns={}){
        let fields = 'jdId jdTitle openingDate closingDate vacancies salary skills eligibilityCriteria jobType location jobProfileDescription';
        let data = await this.model.find({_id: criteria}, columns).populate('jdObjectId', fields);
        return (data);
    }
   

}
module.exports = new Interview();