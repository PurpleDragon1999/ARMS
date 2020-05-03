const Base = require('./base');
const interviewModel = require('../models/interview');
const jobDescriptionModel = require('../models/jobDescription');
const pdfGenerator=require('../middlewares/pdfGenerator');
const nodeMail=require('../middlewares/mailHelper');

class Interview extends Base{
    constructor(){
        super(interviewModel);
    }

  async create(req, res) {
    try {
        const email=req.query.email;
        const jdObj=await jobDescriptionModel.get({_id:req.body.jd});
         nodeMail(email,jdObj,req.body);
        const data = await interviewModel.save(req.body);

       return res.send({
        success: true,
        payload: {
          data,
          message: "Created Successfully",
        },
      });
    } catch (e) {
      res.status(500).send({
        success: false,
        payload: {
          message: e.message,
        },
      });
    }
  }
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
 module.exports = new Interview();

