//const model = require("../models");
const Base = require("./base");
const jobDescriptionModel = require("../models/jobDescription")
const pdfGenerator=require("../middlewares/pdfGenerator");
class JobDescription extends Base{
  constructor(){
      super(jobDescriptionModel);
      console.log("hits child class");
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
       async showJd(req,res){
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
    async showAllJds(req,res){
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
    async updateJd(req,res){ 
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
    async deleteJd(req,res){
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