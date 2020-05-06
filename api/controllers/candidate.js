var multer  = require('multer');
var fs  = require('fs');
var fileName;
const dir = './cvUploads';

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
      if (!fs.existsSync(dir)){
       fs.mkdirSync(dir);
      }
      callback(null, dir);
    },
    filename: (req, file, callback) => {
        fileName = Date.now() + '-' + file.originalname;
        callback(null, fileName);
    }
});

let upload = multer({storage: storage});
const Base = require("./base");
const candidateModel = require("../models/candidate");

class Candidate extends Base{
    constructor(){
        super(candidateModel);
    }
    
  async save(req, res) {
    try {
      let path = "";
      if (req.file) {
        path = req.file.path;
      }

      let objToCreate = {
        name: req.body.name,
        experience: req.body.experience,
        email: req.body.email,
        cv: path,
        skills: req.body.skills,
        appliedFor: req.body.appliedFor,
      };
      let createdObj = await this.model.save(objToCreate);
      return res.send({
        success: true,
        payload: {
          body: createdObj,
          message: "Record created successfully!!",
        },
      });
    } catch (error) {
      res.send({
        success: false,
        payload: {
          message: error.message,
        },
      });
    }
  }

  async modify(req, res){
      let message = "Application Updated Successfully"
      try{
          super.modify(req,res, message)
      }
      catch(err){
          return res.status(400).send({
            success : false,
            payload:{
                message : err.message
            }

          })
      }
  }

  async get(req, res){
      try{
        let candidateId = req.params.id
        let candidateObj = await candidateModel.get(candidateId)

        let candidateDetails = { ...(await candidateObj).toObject(), CV : fs.readFileSync(candidateObj.cv)}
  
        res.status(200).send({
            success : true,
            payload : {
              candidateDetails,
              message : "Candidate Details returned Successfully!!"
            }
        })
      }
      catch(err){
          res.send({
              success : false,
              payload : {
                  message : err.message
              }
          })
      }
  }

}

module.exports = new Candidate();
