const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ObjectId= Schema.Types.ObjectId;

const objectId=mongoose.Schema.Types.objectId;
const jobDescription=require("./jobDescription");
const candidate=require("./candidate");
const employee=require("./employee");
// const criteria=require("./criteria");
module.exports={
    jd:{
        type:ObjectId,
        ref:"jobDescription"
    },
    noOfRounds:{
        type:Number,
        required:true,
        minimum:3,
        maximum:5
    },
    rounds:[{
       panelOfInterviewers:[{
           type:ObjectId,
           ref:"employee"
       }],
       time:{
        type:Date,
        default:Date.now
        },
       roundType:{
         type:String,
        required:true,
        enum:["written","group-discussion","technical","hr","behavioural"]
       }
       
    }],
    date:{
        type: Date,
        required: true
    }
}