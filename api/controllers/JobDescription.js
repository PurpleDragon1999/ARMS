const model = require("../models");

class JobDescription {
    constructor() {}

// creates a new job description
  async createJd(req, res) {
      let jdObj={
        openingDate: req.body.openingDate,
        closingDate: req.body.closingDate,          
        noOfApplicants: req.body.noOfApplicants,
        noOfVacancies: req.body.noOfVacancies,
        appliedFor: req.body.appliedFor,
        salary:req.body.salary,
        skills:req.body.skills,
        eligibilityCriteria:req.body.eligibilityCriteria,
        jobType:req.body.jobType,
        location:req.body.location,
        jobProfileDescription:req.body.jobProfileDescription
      };
     
      try {
        await model.jobDescription.save(jdObj).then(() => {
          res.status(200).send({
            success: true,
            payload: {
              message: "Job Description created successfully"
            }
          });
        });
      } catch (err) {
        res.status(400).send({
          success: false,
          payload: {
            message: err.message
          }
        });
      }
    
    }  

    // gets a particular JD by job profile name
       async showJd(req,res){
        const jd=model.jobDescrition.get({ _id: req.params.id});
        if (!jd) {
            return res.status(404).send({
              payload: {
              data:{ jd },
              message: "Job Description does not exists!"
              }
            });
          }
          res.status(200).send({
            payload: {
              data: { jd },
            message: "Job Description retrieved successfully"
            }
          });
        
       }

    //gets list of all JDs
    async showAllJds(req,res){
        const jd=model.jobDescrition.index();
        if (!jd) {
            return res.status(404).send({
              payload: {
              data:{ jd },
              message: "Job Description list has no items!"
              }
            });
          }
          res.status(200).send({
            payload: {
              data: { jd },
            message: "Job Description List retrieved successfully"
            }
          });   
    }


    //update a job description
    async updateJd(req,res){
        const updatedJdObj={
        openingDate: req.body.openingDate,
        closingDate: req.body.closingDate,          
        noOfApplicants: req.body.noOfApplicants,
        noOfVacancies: req.body.noOfVacancies,
        appliedFor: req.body.appliedFor,
        salary:req.body.salary,
        skills:req.body.skills,
        eligibilityCriteria:req.body.eligibilityCriteria,
        jobType:req.body.jobType,
        location:req.body.location,
        jobProfileDescription:req.body.jobProfileDescription
        }
        try{
            const jd= await model.jobDescrition.update({_id: req.params.id},updatedJdObj);
            res.status(200).send({success: true,
                payload: {
                message:"Job Description updated successfully"
                }   
                });
            }
            catch(err){
                res.status(400).send({
                    success: false,
                    payload: {
                      message: err.message
                    }
                  });
            }        
        }

    //delete a job  description
    async deleteJd(req,res){
        try{
            const jd = await model.jobDescription.delete({ _id: req.params.id });
            res.send({
                success: true,
                payload: {
                  message: "Job Description Deleted Successfully"
                }
              });
        }
        catch(err){
            res.status(400).send({
                success: false,
                payload: {
                  message: err.message
                }
              });
        }

    }
}
module.exports= new JobDescription();