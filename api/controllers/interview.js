const interviewModel = require('../models/interview');

class Interview {
    constructor(){

    }
    async create(req,res){
        try{    
            let interviewObj=req.body;
            let createdObj = await interviewModel.save(interviewObj);
            return res.send({
                    success: true,
                    payload: {
                        body: createdObj,
                        message: "created successfully"
                    }
                });

        }
        catch(error){
            res.send({
                success: false,
                payload: {
                    message: error
                }
            });
        }
    }

    async updateInterview(req,res){
        try{
            const interview = await interviewModel.findOne({_id: req.params.id});
            if(interview==null){
                res.send({
                    success: true,
                    payload: {
                        message: "no interview found with this id"
                    }
                });
            }
            else{
                let updateObj= req.body;
                let updatedInterviewStatus = await interviewModel.updateOne({_id: req.params.id}, updateObj)
                res.send({
                    success: true,
                    payload: {
                        body: updatedInterviewStatus,
                        message: "updated interview successfully"
                    }
                });
            }
        }
        catch(error){
            console.log(error);
        }
    }

    async deleteInterview(req,res){
        try{
            const interview = await interviewModel.findOne({_id: req.params.id});
            if(interview==null){
                res.send({
                    success: true,
                    payload: {
                        message: "no interview found with this id"
                    }
                });
            }
            else{
                let deletedInterviewStatus = await interviewModel.deleteOne({_id: req.params.id});
                res.send({
                    success: true,
                    payload: {
                        body: deletedInterviewStatus,
                        message: "deleted interview successfully"
                    }
                });
            }
        }
        catch(error){
            console.log(error);
        }
    }

    async getInterview(req,res){
        try{
            const interview = await interviewModel.findOne({_id: req.params.id});
            if(interview==null){
                res.send({
                    success: true,
                    payload: {
                        message: "no interview found with this id"
                    }
                });
            }
            else{
                res.send({
                    success: true,
                    payload: {
                        body: interview,
                        message: "showing interview details"
                    }
                });
            }

        }
        catch(error){
            console.log(error);
        }
    }

  
}

module.exports = new Interview();