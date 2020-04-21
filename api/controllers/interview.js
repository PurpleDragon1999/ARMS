const Base = require('./base');
const interviewModel = require('../models/interview');

class Interview extends Base{
    constructor(){
        super(interviewModel);
        console.log('Child Constructor');
    }
}

module.exports = new Interview();