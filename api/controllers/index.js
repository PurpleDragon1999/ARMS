const employee = require('./employee');
const interview = require('./interview');
const jobDescription = require('./JobDescription');
const candidate = require("./candidate");
const round = require('./round');
const login =require('./login');

module.exports = {
    employee: employee,
    interview: interview,
    jobDescription: jobDescription,
    candidate: candidate,
    round: round,
    login: login
};
