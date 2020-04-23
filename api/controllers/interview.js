const interviewModel = require('../models/interview');
const mailer=require('./mailHelper');
class Interview {
    constructor(){

    }
    async createInterview(req,res){
        try{    
            let interviewObj=req.body;
            const email=req.query.email
            let createdInterview = await interviewModel.save(interviewObj);
            const output = `
            <style>
                .bottom{
                  color:grey;
                  font-size:0.8rem;
                   }
            </style>
         <p>Congratulations,you are registered on our CyberGroup</p>
            <h3>You have been shortlisted for interview in our company as per following details</h3>
          <table>
          <tr>
            <td>Post:</td>
            <td>Consultant1</td>
          </tr>
          <tr>
            <td>No Of Rounds</td>
            <td>${createdInterview.noOfRounds}</td>
            </tr>
          <tr>
          <td>Date Of Interview</td>
          <td>${createdInterview.date}</td>
          </tr>
         
        </table>
          <p>Sign Up on below form to confirm your presence</p>
          <p class="bottom">This is Computer Generated Email ,Don't reply back to it</p>
          `;
            nodeMail(output,email);
            return res.send({
                    success: true,
                    payload: {
                        body: createdInterview,
                        message: "created interview successfully"
                    }
                });

        }
        catch(error){
            console.log(error);
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