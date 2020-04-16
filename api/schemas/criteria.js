const mongoose=require('mongoose');
const objectId=mongoose.Schema.Types.objectId;
const interview=require("./interview");
module.exports={
     //Or roundType: 'Communication/Behavioural/Technical',
     //doubt
    roundObjId: {
        type: objectId,
        ref: interview.rounds    
    },
    title:{
         type:string,
          enum:["logical-ability","critical-reasoning","aptitude","attitude","personality","posture","concepts",
                 "in-depth-knowledge","determination","communication"],
         required:true   
        }
}