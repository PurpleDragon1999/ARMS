const candidateModel=require('../models/candidate');
const mailer=require('./mailHelper');


class Candidate{
    constructor(){

    }
    async createCandidate(req,res){
        try{    
            let candidateObj=req.body;
            let createdCandidate = await candidateModel.save(candidateObj);
            nodeMail(createdCandidate);
            return res.send({
                    success: true,
                    payload: {
                        body: createdCandidate,
                        message: "created candidate successfully"
                    }
                });

        }
        catch(error){
            console.log(error);
        }
       
       
    }
    
}
module.exports = new Candidate();