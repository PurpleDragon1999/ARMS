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
      const mailList=["balanideepanshu92@gmail.com"];
      // mailList.push(req.query.email1);
      // mailList.push(req.query.email2);
      const output = `<style>
      .bottom{
        color:grey;
        font-size:0.8rem;
         }
         .bold{
             font-weight:bolder;
         }
    </style>
    <p>Hello</p><b>Deepanshu Balani,
    </b>
    
    <p>Thank You for expressing your Interest for the position of ${data.jdId}(${data.jdTitle})
    ,You can read more about us on our company career page </p>
  
    <a href="www.cygrp.com/careers">www.cygrp.com/careers</a>
    
    <p>Please signup if you wish to accept and proceed with our process</p>
   
    <a href="#">Link To Form</a>
    <p>Regards,</p>
   
    <p>HR,</p>
    <p> Cybergroup,B-9, Block B, Sector 3, Noida, Uttar Pradesh 201301</p>
     
    <p>Thanks</p>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRCUuWWhu0HByWgdDAp2cA1TDf-a_
     FpjUA_DFbRt33DViY9tNDH&usqp=CAU"width="150"height="150">
     <em class="bottom">This is automatically generated email,please do not reply</em>
      
    `;
      nodeMail(mailList,output,data);
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
      return res.send({
        success: true,
        payload: {
          data,
          message: "Job Retrieved Successfully",
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
      const pdf = pdfGenerator(req.body, filename);
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
}
module.exports = new JobDescription();
