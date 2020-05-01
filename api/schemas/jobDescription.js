const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.objectId;

module.exports = {
  jdId: {
    type: String,
    required: true,
    unique: true,
  },
  jdTitle: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  openingDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  closingDate: {
    type: Date,
    required: true,
  },
  vacancies: {
    type: Number,
    required: true,
    default: 20,
  },
  salary: {
    type: Number,

  },
  skills: {
    type: String,
  },
  eligibilityCriteria: {
    type: String,
    default: "ALL CLEAR",
  },
  jobType: {
    type: String,
    required: true,
    enum: ["full-time", "part-time"],
  },
  location: {
    type: String,
    required: true,
  },
  jobProfileDescription: {
    type: String,
    required: true,
  },
};
