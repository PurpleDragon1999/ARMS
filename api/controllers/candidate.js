const Base = require("./base");
const candidateModel = require("../models/candidate")

class Candidate extends Base{
    constructor(){
        super(candidateModel);
        console.log("hits child class")
    }
}

module.exports = new Candidate();

