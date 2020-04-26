const Base = require('./base');
const interviewModel = require('../models/interview');

class Interview extends Base{
    constructor(){
        super(interviewModel);
    }

  module.exports = new Interview();
