const Base = require("./base");
const candidateModel = require("../models/candidate");

class Candidate extends Base{
    constructor(){
        super(candidateModel);
    }

// async uploadDetails(req, res) {
  //   try {
  //     let path = "";
  //     if (req.file) {
  //       path = req.file.path;
  //     }
  //     let objToCreate = {
  //       name: req.body.name,
  //       experience: req.body.experience,
  //       email: req.body.email,
  //       cv: path,
  //       skills: req.body.skills,
  //       appliedFor: req.body.appliedFor,
  //     };
  //     let createdObj = await this.model.save(objToCreate);
  //     return res.send({
  //       success: true,
  //       payload: {
  //         body: createdObj,
  //         message: "Record created successfully!!",
  //       },
  //     });
  //   } catch (error) {
  //     res.send({
  //       success: false,
  //       payload: {
  //         message: error.message,
  //       },
  //     });
  //   }
  // }
}

module.exports = new Candidate();
