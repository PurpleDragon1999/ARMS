const Base = require("./base");
const jobDescriptionModel = require("../models/jobDescription")

class JobDescription extends Base{
  constructor(){
      super(jobDescriptionModel);
  }


// creates a new job description
  async save(req, res) {
      try {
    super.save(req, res);
  } catch (e) {
    return res.status(500).send({
      success: false,
      payload: {
        message: e.message,
      }
    });
  }
}

    // gets a particular JD by job profile name
       async get(req,res){
         try{
           super.get(req,res);
         }catch(e){
          return res.status(500).send({
            success: false,
            payload: {
              message: e.message,
            }
          });
        }
     }
  
  //gets list of all JDs
    async index(req,res){
      try{
        super.index(req,res);
      }catch(e){
        return res.status(500).send({
          success: false,
          payload: {
            message: e.message,
          }
        });
      }
    }
  
  //update a job description
    async modify(req,res){ 
      try{
        super.modify(req,res);
      }catch(e){
        return res.status(500).send({
          success: false,
          payload: {
            message: e.message,
          }
        });
      }
    }


//delete a job  description
    async remove(req,res){
        try{
          super.remove(req,res);
        }catch(e){
          return res.status(500).send({
            success: false,
            payload: {
              message: e.message,
            }
          });
        }
      }
}
module.exports= new JobDescription();