const Base = require("./base");
const candidateModel = require("../models/candidate");
var fs = require("fs");
var validator = require('aadhaar-validator');
const jobDescriptionModel = require('../models/jobDescription');
const nodeMail = require('../middlewares/mailHelper');

async function validateCandidate(candidate) {
  console.log(candidate)
  let emailExists = await candidateModel.get({ email: candidate.email })
  if (emailExists) {
    throw new Error("This Email is already registered for this Job.")
    return
  }

  let aadharExists = await candidateModel.get({ aadhar: candidate.aadhar })
  if (aadharExists) {
    throw new Error("This Aadhar number is already registered for this job")
    return
  }

  if(validator.isValidNumber(candidate.aadhar)){
      throw new Error("This aadhar number is not valid");
      return
  }

  if (!candidate.cv) {
    throw new Error("CV is Required")
    return
  }

}

class Candidate extends Base {
  constructor() {
    super(candidateModel);
  }

  async save(req, res) {
    try {
      let path = "";
      if (req.file) {
        path = req.file.path;
      }
      let objToCreate = {
        name: req.body.name,
        experience: req.body.experience,
        email: req.body.email,
        aadhar: req.body.aadhar,
        cv: path,
        skills: req.body.skills,
        appliedFor: req.body.appliedFor,
        status: "applied"
      };

      await validateCandidate(objToCreate)
      let createdObj = await this.model.save(objToCreate);
      let jdJson=await jobDescriptionModel.get({_id:createdObj.appliedFor});
      const output = `<style>
      .bottom{
        color:grey;
        font-size:0.8rem;
         }
         .bold{
             font-weight:bolder;
         }
    </style>
    <p>Dear Mr/Ms.</p><b>${createdObj.name},</b>We are pleased to inform you that you have 
    successfully registered for an interview process with CyberGroup.The details of interview will be communicated soon.
    </p>
    <table>
       <tr>
         <td><b>Job ID:</b></td>
         <td>${jdJson.jdId}</td>
       </tr>
       <tr>
       <td><b>Job Title:</b></td>
       <td>${jdJson.jdTitle}</td>
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
    <a href="http://localhost:4200/progressTracker/${createdObj._id}">Please click here to track your progress</a>
    <br>
    <em class="bottom">This is automatically generated email,please do not reply</em>
    <p>Thanks</p>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRCUuWWhu0HByWgdDAp2cA1TDf-a_
     FpjUA_DFbRt33DViY9tNDH&usqp=CAU"width="100"height="100">
      
    `;
      nodeMail(createdObj.email,output,jdJson);
      return res.send({

        success: true,
        payload: {
          body: createdObj,
          message: "Record created successfully!!",
        },
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        payload: {
          message: error.message,
        },
      });
    }
  }

  async modify(req, res) {
    let message = "Application Updated Successfully"
    try {
      await validateCandidate(req.body)
      super.modify(req, res, message)
    }
    catch (err) {
      return res.status(400).send({
        success: false,
        payload: {
          message: err.message
        }

      })
    }
  }

  // async get(req, res) {
  //   try {
  //     let candidateId = req.params.id
  //     let candidateObj = await candidateModel.get({ _id: candidateId })
  //     console.log(candidateId, candidateObj)

  //     let data = { ...(await candidateObj).toObject(), cv: fs.readFileSync(candidateObj.cv) }

  //     res.status(200).send({
  //       success: true,
  //       payload: {
  //         data,
  //         message: "Candidate Details returned Successfully!!"
  //       }
  //     })
  //   }
  //   catch (err) {
  //     console.log(err)
  //     res.send({
  //       success: false,
  //       payload: {
  //         message: err.message
  //       }
  //     })
  //   }
  // }

  // async searchRecord(req, res) {
  //   try {
  //     let queryObject = {
  //       $regex: ".*^" + req.query.character + ".*",
  //       $options: "i",
  //     };

  //     let candidateList = await candidateModel.getAll({ $or: [{ name: queryObject }] });

  //     candidateList = await Promise.all(candidateList.map(async (candidate) => {
  //       if (fs.existsSync(candidate.cv)) {
  //         return { ...candidate.toObject(), cv: fs.readFileSync(candidate.cv) };
  //       }
  //       return { ...candidate.toObject() };
  //     }));

  //     req.body.records = candidateList;
  //     super.getPaginatedResult(req, res)
  //   }
  //   catch (err) {
  //     res.send({
  //       success: false,
  //       payload: {
  //         message: err.message
  //       }
  //     })
  //   }
  //}

}

module.exports = new Candidate();
