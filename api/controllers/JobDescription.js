const Base = require("./base");
const model = require("../models");
const jobDescriptionModel = require("../models/jobDescription");

const nodeMail=require('../middlewares/mailHelper');
class JobDescription extends Base {
  constructor() {
    super(jobDescriptionModel);
  }

  // creates a new job description
  async save(req, res) {
    try {
      const data = await model.jobDescription.save(req.body);
      return res.status(200).send({
        success: true,
        payload: {
          data,
          message: " Job Description Created Successfully",
        },
      });
    } catch (e) {
      return res.status(500).send({
        success: false,
        payload: {
          message: e.message,
        },
      });
    }
  }

  // gets a particular JD by job profile name
  async get(req, res) {
    try {
      const data = await model.jobDescription.get({jdId: req.params.id });
      if(data!=null){
        return res.send({
          success: true,
          payload: {
            data,
            message: "Job Retrieved Successfully",
          },
        });
     }
      else{
        return res.send({
          success: false,
          payload: {
            data,
            message: "No id",
          },
        });
      }

    } catch (e) {
      return res.status(500).send({
        success: false,
        payload: {
          message: e.message,
        },
      });
    }
  }

  //gets list of all JDs
  async index(req, res) {
    try {
      super.index(req, res);
    } catch (e) {
      return res.status(500).send({
        success: false,
        payload: {
          message: e.message,
        },
      });
    }
  }

  //update a job description
  async modify(req, res) {
    try {
      const jdExists = await model.jobDescription.get(
        { _id: req.params.id },
        {}
      );
      if (!jdExists) {
        return res.status(400).send({
          success: false,
          payload: {
            message: "No Job Description exists with this ID",
          },
        });
      }
      const jd = await model.jobDescription.modify(
        { _id: req.params.id },
        req.body
      );
      const filename = "Updated".concat(req.body.jdId);
      return res.status(200).send({
        success: true,
        payload: {
          data: jd,
          message: "Job Description Updated Successfully",
        },
      });
    } catch (e) {
      return res.status(500).send({
        success: false,
        payload: {
          message: e.message,
        },
      });
    }
  }

  //delete a job  description
  async remove(req, res) {
    try {
      super.remove(req, res);
    } catch (e) {
      return res.status(500).send({
        success: false,
        payload: {
          message: e.message,
        },
      });
    }
  }

  async searchRecord(req, res){
    try {
      let queryObject = {
        $regex: ".*^" + req.query.character + ".*",
        $options: "i",
      };
      
      const searchedRecords = await this.model.getAll({ $or: [{name:queryObject}, {jdTitle:queryObject}]})
      req.body.records = searchedRecords;
      if (req.query.pagination==="true"){
        return this.getPaginatedResult(req, res);
      }
      else{
        res.status(200).send({
          payload:{
            data : searchedRecords,
            message :"Records Returned Successfully"
          }
        })
      }
      
    } catch (err) {
      console.log(err, "error")
      res.status(500).send({
        success: false,
        payload: {
          message: err.message,
        },
      });
    }
  }
}
module.exports = new JobDescription();
