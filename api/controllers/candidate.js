const Base = require("./base");
const candidateModel = require("../models/candidate");
var fs = require("fs")
var validator= require("aadhaar-validator")

async function validateCandidate(candidate) {
  let emailExists = await candidateModel.get({ email: candidate.email })
  if (emailExists) {
    throw new Error("This Email is already registered.")
    return
  }

  let aadharExists = await candidateModel.get({ aadhar: candidate.aadhar })
  if (aadharExists) {
    throw new Error("This Aadhar number is already registered")
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
      console.log("success")
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

  async get(req, res) {
    try {
      let candidateId = req.params.id
      let candidateObj = await candidateModel.get({ _id: candidateId })

      let data = { ...(await candidateObj).toObject(), cv: fs.readFileSync(candidateObj.cv) }

      res.status(200).send({
        success: true,
        payload: {
          data,
          message: "Candidate Details returned Successfully!!"
        }
      })
    }
    catch (err) {
      console.log(err)
      res.send({
        success: false,
        payload: {
          message: err.message
        }
      })
    }
  }

  async getAll(req, res) {
    try {
      let candidatesList = await candidateModel.getAll()
      candidatesList = await Promise.all(candidatesList.map(async (candidate) => {
        return { ...candidate.toObject(), cv: fs.readFileSync(candidate.cv) }
      }))
      req.body.records = candidatesList
      super.getPaginatedResult(req, res)
    }
    catch (err) {
      console.log(err)
      res.send({
        success: false,
        payload: {
          message: err.message
        }
      })
    }
  }

}

module.exports = new Candidate();
