const roundModel = require('../models/round');

class Round {
    constructor(){

    }

    async createRound(req,res){
        try{
            console.log(req.body);
            console.log(req.params);
            let roundObj = {
                "body": req.body,
                "params": req.params
            };
            console.log(roundObj);
            let createdRound = await roundModel.save(req.body);
            return res.send({
                success: true,
                payload: {
                    body: roundObj,
                    message: "created interview successfully"
                }
            });

        }
        catch(error){
            console.log(error);
        }
    }
}

module.exports = new Round();