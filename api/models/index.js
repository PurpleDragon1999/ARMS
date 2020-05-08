const interview = require('./interview');
const candidate = require("./candidate")
const jobDescription=require('./jobDescription');
const employee=require('./employee');


module.exports = {
    employee:employee,
    jobDescription:jobDescription,
    interview:interview,
    candidate:candidate
};
