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

    async modify(criteria, updateObj){
        return this.model.updateOne({_id: criteria}, updateObj);
    }

    async remove(criteria){
        return this.model.deleteOne({_id: criteria});
    }

    async index(criteria = {}, columns = {}) {
        let fields = 'jdId jdTitle openingDate closingDate vacancies salary skills eligibilityCriteria jobType location jobProfileDescription';
        let panelFields= 'name designation role employeeId email profileImageURL'
        let candidateFields='name experience email aadhar cv skills selection appliedFor'
        let data = await this.model.find(criteria, columns).populate('jdObjectId', fields)
        .populate('rounds.panelOfInterviewers.panel1',panelFields)
        .populate('rounds.panelOfInterviewers.panel2',panelFields)
        .populate('rounds.panelOfInterviewers.panel3',panelFields)
        .populate('candidateObjIds',candidateFields);
        return (data);
      }

      async getAll(criteria = {}, columns = {}) {
        let fields = 'jdId jdTitle openingDate closingDate vacancies salary skills eligibilityCriteria jobType location jobProfileDescription';
        let panelFields= 'name designation role employeeId email profileImageURL'
        let candidateFields='name experience email aadhar cv skills selection appliedFor'
        let data = await this.model.find(criteria, columns).populate('jdObjectId', fields)
        .populate('rounds.panelOfInterviewers.panel1',panelFields)
        .populate('rounds.panelOfInterviewers.panel2',panelFields)
        .populate('rounds.panelOfInterviewers.panel3',panelFields)
        .populate('candidateObjIds',candidateFields);
        return (data);
      }


    async get(criteria={}, columns={}){
        let jdFields = 'jdId jdTitle openingDate closingDate vacancies salary skills eligibilityCriteria jobType location jobProfileDescription';
        let panelFields= 'name designation role employeeId email profileImageURL'
        let data = await this.model.find({_id: criteria}, columns).populate('jdObjectId', jdFields)
            .populate('rounds.panelOfInterviewers.panel1',panelFields)
            .populate('rounds.panelOfInterviewers.panel2',panelFields)
            .populate('rounds.panelOfInterviewers.panel3',panelFields);
        return (data);
    }
           
}
module.exports = new Interview();