const mongoose=require("mongoose");
var ObjectId=mongoose.Schema.Types.ObjectId;

module.exports={
    name:{
      type:String,
      required:true,
      minlength:2,
      maxlength:100
    },
    designation:{
       type:String,
       required:true,
       enum:["intern","consultant1","consultant2","associate1","associate2","manager"],
       default:"consultant1"
    },
    role:{
        type:String,
        required:true,
        enum:["admin","hr","interviewer"]
    },
    employeeId:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        minlength:5,
        maxlength:100,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',

        // error : validateEmail is undefined => PS: had to comment
        //validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    profileImageURL:{
        type:String,
        default:null
    }
    
}