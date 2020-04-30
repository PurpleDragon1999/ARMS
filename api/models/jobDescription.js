const mongoose = require("mongoose");
const schema = require("../schemas");
const jobDescriptionschema = new mongoose.Schema(schema.jobDescription);

class JobDescription {
  constructor() {
    this.model = mongoose.model("jobDescription", jobDescriptionschema);
  }
  //getting the JD data as per criteria
  async get(criteria={}) {
    return this.model.findOne(criteria);
  }
  //creates a new JD
  async save(jdObj) {
    return this.model.create(jdObj);
  }
  //update the JD data as per criteria and show updatedEmployeeObj
  async modify(criteria = {}, updatedJdObj) {
    return this.model.updateOne(criteria, updatedJdObj);
  }
  //delete the jd data as per criteria
  async remove(id) {
    return this.model.deleteOne({ _id: id });
  }
  //to get all the JDs
  async index(criteria = {}, columns = {}) {
    return this.model.find(criteria, columns);
  }
}

module.exports = new JobDescription();
