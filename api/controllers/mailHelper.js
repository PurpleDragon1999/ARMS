const nodemailer = require("nodemailer");

require("dotenv").config();
// node function which sends email to new user create

 nodeMail=async function(newEmployee){
   try{
     let testAccount = await nodemailer.createTestAccount();
    
     // create reusable transporter object using the default SMTP transport
         let transporter = nodemailer.createTransport({
         service:'gmail',
          auth:{
           user:process.env.EMAIL,
           pass:process.env.PASSWORD
         }
      });
  // send mail with defined transport object
  let info ={
     from: '"balanideepanshu92@gmail.com"', // sender address
     to:newEmployee.email, // list of receivers
     subject: "Cybergroup  Contact Request", // Subject line
     text: "Welcome to Cybergroup ", // plain text body
    
   }
   transporter.sendMail(info,function(err,data){
      
     if(err){
          console.error("error occurs",err);
        }
        else{
        
        }
   });
  }catch(error){
    console.error(error);
  }
}

module.exports=nodeMail