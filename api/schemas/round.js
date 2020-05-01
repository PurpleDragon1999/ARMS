const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

// const criteria=require("./criteria");
module.exports = {

    interviewObjId: {
        type: objectId,
        ref: "Interview"
    },

    candidateObjId: {
        type: objectId,
        ref: "candidate"
    },

    recommendedBy: [{
        type: objectId,
        ref: "employee"
    }],

    interviewer: [{
        type: objectId,
        ref: "employee"
    }],

    //Why is it here ?
    // roundNumber:{
    //     type:objectId,
    //     ref:interview.rounds
    // },
    //--------------------------------------------------
    
    communiation: {
        marks: {
            type:Number,
            required:true
        },
        remarks: {
            type:String,
            required:true
        }
    },
    flexibility: {
        marks: {
            type:Number,
            required:true
        },
        remarks: {
            type:String,
            required:true
        }
    },
    reasoning: {
        marks: {
            type:Number,
            required:true
        },
        remarks: {
            type:String,
            required:true
        }
    },
    confidence: {
        marks: {
            type:Number,
            required:true
        },
        remarks: {
            type:String,
            required:true
        }
    },
    thought_process: {
        marks: {
            type:Number,
            required:true
        },
        remarks: {
            type:String,
            required:true
        }
    },
    attitude: {
        marks: {
            type:Number,
            required:true
        },
        remarks: {
            type:String,
            required:true
        }
    },
    personality: {
        marks:{
            type:Number,
            required:true
        },
        remarks:{
            type:String,
            required:true
        }
    },
    other_values: [
        {
            name: String,
            marks: {
                type: Number,
                required: true
            },
            remarks: {
                type: String,
                required: true
            }
        }
    ],
    
    venue: {
        type:String,
        minlength:2,
        maxlength:20
    },
    feedback: {
        type:String,
        minlength:2,
        maxlength:100
    },
    roundResult: {
        type:String,
        enum:['success','failure','un-clear']
    }
}
