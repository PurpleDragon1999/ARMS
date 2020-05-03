const Base = require('./base');
const model = require("../models");
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


  
  async get(req, res) {
    try {
      const data = await interviewModel.get({_id: req.params.id} );
      console.log(data.length)
      if (data.length==0){
        return res.status(400).send({
          success: false,
          payload: {
            message: "No interview record found",
          },
        });
      }
      super.get(req, res, "Interview record retrieved successfully");
    } catch (e) {
      return res.status(500).send({
        success: false,
        payload: {
          message: e.message,
        },
      });
    }
  }
  
}


 module.exports = new Interview();

