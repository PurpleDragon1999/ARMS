const Base = require("./base");
const model = require("../models");
const jobDescriptionModel = require("../models/jobDescription");
const pdfGenerator = require("../middlewares/pdfGenerator");

class JobDescription extends Base {
  constructor() {
    super(jobDescriptionModel);
  }

  // creates a new job description
  async save(req, res) {
    try {
      const jd = await model.jobDescription.save(req.body);
      const pdf = pdfGenerator(req.body, req.body.jdId);
      return res.status(200).send({
        success: true,
        payload: {
          data: jd,
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
      const data = await model.jobDescription.get({ _id: req.params.id });
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
