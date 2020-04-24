const Base = require('./base');
const candidateModel = require('../models/candidate')

class Candidate extends Base{
    constructor(){
        super(candidateModel);
    }
    
}

module.exports = new Candidate();