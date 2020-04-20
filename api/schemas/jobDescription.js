const mongoose=require("mongoose");
const objectId=mongoose.Schema.Types.objectId;

module.exports={
    openingDate:{
     type:Date,
     required:true,
     default:Date.now
    },
    closingDate:{
    type:Date,
    required:true,
    },
    noOfApplicants:{
    type:Number,
    default:0
    },
     noOfVacancies:{
    type:Number,
    required:true,
    default:20
    },
    appliedFor:{
     type:String,
     required:true,
     enum:["intern","consultant1","consultant2","associate1","associate2","manager1","manager2"],
     default:"consultant1"
    },
    salary:{
     type:Number,
     minimum:20000,
     maximum :200000    
    },
    skills:[{
        type:String,
      
    }],
    eligibilityCriteria:{
        type:String,
        default:"ALL CLEAR"
    },
    otherBenefits:[{
        type:String,
    }],
    jobType:{
        type:String,
        required:true,
        enum:["full-time","part-time"]
    },
    location:{
        type:String,
        required:true,
        enum:["delhi","noida","mumbai","bengaluru","chennai","dallas","pan-India"]
    },
    jobProfileDescription:{
        type:String,
        required:true
    },

}