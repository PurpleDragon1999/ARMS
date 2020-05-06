const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const jobDescription = require("./jobDescription");
const candidate = require("./candidate");
const employee = require("./employee");

module.exports = {
  jdObjectId: {
    type: ObjectId,
    ref: "jobDescription",
  },
  noOfRounds: {
    type: Number,
    required: true,
    minimum: 3,
    maximum: 5,
  },
  rounds: [
    {
      panelOfInterviewers: {
         panel1:{
           type:ObjectId,
           ref:"employee"
         },
        panel2:{
          type:ObjectId,
          ref:"employee"
        },
        panel3:{
          type:ObjectId,
          ref:"employee"
        }
      },
      time: {
        type: Date,
        default: Date.now,
      },
      roundType: {
        type: String,
        required: true,
        enum: ["non-technical", "technical", "hr"],
      },
    },
  ],
  date: {
    type: Date,
    required: true,
  },
};
