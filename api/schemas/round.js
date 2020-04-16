const mongoose=require("mongoose");
const objectId=mongoose.Schema.Types.objectId;
const interview=require("./interview");
const candidate=require("./candidate");
const employee=require("./employee");
const criteria=require("./criteria");
module.exports={
  interviewObjId:{
      type:objectId,
      ref:"interview"
   },
  candidateObjId:{
      type:objectId,
      ref:"candidate"
   },
  recommendedBy:[{
      type:objectId,
      ref:"employee"
    }],
    interviewer:[{
        type:objectId,
        ref:"employee"
    }],
    performance:[{
        criteria:{
            type:objectId,
            ref:"criteria",
            },
        marks:{
            type:Number,
            default:-1
        },
        remarks:{
            type:String,
            default:null
            }
    }],
   
    venue:{
        type:String,
        minlength:2,
        maxlength:20
    },
    feedback:{
        type:String,
        minlength:2,
        maxlength:100
    },
    roundResult:{
        type:String,
        enum:['success','failure','un-clear']
    }
}