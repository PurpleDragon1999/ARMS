const interview = require('./interview');
const candidate = require("./candidate")
const jobDescription=require('./jobDescription');
const employee=require('./employee');

module.exports = {
    interview:interview,
    employee:employee,
    jobDescription:jobDescription,
    candidate:candidate
};
