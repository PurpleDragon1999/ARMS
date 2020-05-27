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
  venue:{
    type: String,
    // required: true,
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
         panel1:[{
           type:ObjectId,
           ref:"Employee"
         }],
        panel2:[{
          type:ObjectId,
          ref:"Employee"
        }],
        panel3:[{
          type:ObjectId,
          ref:"Employee"
        }]
      },
      time: {
        type: Date,
        default: Date.now,
      },
      roundType: {
        type: String,
        required: true,
        enum: ["written", "group-discussion", "technical","hr","behavioural"],
      },
    },
  ],
  date: {
    type: Date,
    required: true,
  },
  candidateObjIds:[{
    type:ObjectId,
    ref:"Candidate"
  }]
};
