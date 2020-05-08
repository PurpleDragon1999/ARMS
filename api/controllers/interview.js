const model = require("../models");
const Base = require('./base');
const interviewModel = require('../models/interview');
const jobDescriptionModel = require('../models/jobDescription');
const pdfGenerator=require('../middlewares/pdfGenerator');
const nodeMail=require('../middlewares/mailHelper');
const mongoose=require('mongoose');
class Interview extends Base{
    constructor(){
        super(interviewModel);
    }

  async save(req, res) {
    try {
       
        const newInterview={
               jdObjectId:req.body.jdObjectId,
               noOfRounds:req.body.noOfRounds,
               date:req.body.date,
               rounds:req.body.rounds,
               candidateObjIds:req.body.candidateObjIds
        }
        const jdJson=await jobDescriptionModel.get({_id:req.body.jdObjectId});
        const interviewObj = await interviewModel.save(newInterview);
        let candidates=interviewObj.candidateObjIds;
   
        for (let candidateId of candidates){
        const output = `<style>
  .bottom{
    color:grey;
    font-size:0.8rem;
     }
     .bold{
         font-weight:bolder;
     }
</style>
<p>Dear Mr/Ms.</p><b>Deepanshu Balani,</b>We are pleased to inform you that you have been
shortlisted for an interview process with CyberGroup.The details of interview will be communicated soon.
</p>
<table>
   <tr>
     <td><b>Job ID:</b></td>
     <td>${jdJson.jdId}</td>
   </tr>
   <tr>
     <td><b>Job Type:</b></td>
     <td>${jdJson.jobType}</td>
   </tr>
    <tr>
   <td ><b>Address:</b></td>
   <td> B-9, Block B, Sector 3, Noida, Uttar Pradesh 201301</td>
 </tr>
</table>
<a href="http://localhost:4200/progressTracker/${candidateId}">Please click here to track your progress</a>
<br>
<em class="bottom">This is automatically generated email,please do not reply</em>
<p>Thanks</p>
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRCUuWWhu0HByWgdDAp2cA1TDf-a_
 FpjUA_DFbRt33DViY9tNDH&usqp=CAU"width="100"height="100">
  
`;
 const candidateObj=await model.candidate.get({_id:candidateId},{email:1});
     nodeMail(candidateObj.email,output,jdJson);
    }
      return res.send({
        success: true,
        payload: {
          data:interviewObj,
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

  async remove(req, res) {
    try {
      const data = await interviewModel.get({_id: req.params.id} );
      if (data.length==0){
        return res.status(400).send({
          success: false,
          payload: {
            message: "No interview record found",
          },
        });
      }
      super.remove(req, res, "Interview record deleted successfully");
    } catch (e) {
      return res.status(500).send({
        success: false,
        payload: {
          message: e.message,
        },
      });
    }
  }

  async modify(req, res) {
    try {
      const data = await interviewModel.get({_id: req.params.id} );
      if (data.length==0){
        return res.status(400).send({
          success: false,
          payload: {
            message: "No interview record found",
          },
        });
      }
      super.modify(req, res, "Interview record modified successfully");
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

