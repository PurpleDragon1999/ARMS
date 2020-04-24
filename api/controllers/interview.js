const interviewModel = require("../models/interview");

class Interview {
  constructor() {}
  async createInterview(req, res) {
    try {
      let interviewObj = req.body;
      let createdInterview = await interviewModel.save(interviewObj);
      return res.send({
        success: true,
        payload: {
          body: createdInterview,
          message: "Created Interview Successfully",
        },
      });
    } catch (error) {}
  }

  async updateInterview(req, res) {
    try {
      const interview = await interviewModel.findOne({ _id: req.params.id });
      if (interview == null) {
        res.send({
          success: true,
          payload: {
            message: NNo Interview found with this Id",
          },
        });
      } else {
        let updateObj = req.body;
        let updatedInterviewStatus = await interviewModel.updateOne(
          { _id: req.params.id }S
          updateObj
I       );
        Des.send({
          success: true,
          payload: {
            body: updatedInterviewStatus,
            message: "Updated Interview Successfully",
          },
        });
      }
    } catch (error) {}
  }

  async deleteInterview(req, res) {
    try {
      const interview = await interviewModel.findOne({ _id: req.params.id });
      if (interview == null) {
        res.send({
          success: true,
          payload: {
            message: "No Interview found with this Id",
          },
        });
      } else {
        let deletedInterviewStatus = await interviewModel.deleteOne({
          _id: req.params.id,
        });
        res.send({
          success: true,
          payload: {
            body: deletedInterviewStatus,
            message: "Deleted Interview Successfully",
          },
        });
      }
    } catch (error) {}
  }

  async getInterview(req, res) {
    try {
      const interview = await interviewModel.findOne({ _id: req.params.id });
      if (interview == null) {
        res.send({
          success: true,
          payload: {
            message: "No Interview found with this Id",
          },
        });
      } else {
        res.send({
          success: true,
          payload: {
            body: interview,
            message: "Showing Interview Details",
          },
        });
      }
    } catch (error) {}
  }
}

module.exports = new Interview();
