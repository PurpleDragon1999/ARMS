const nodemailer = require("nodemailer");

require("dotenv").config();
// node function which sends email to new user create

 nodeMail=async function(email,jdJson,interviewObj){
  const output = `<style>
  .bottom{
    color:grey;
    font-size:0.8rem;
     }
     .bold{
         font-weight:bold;
     }
</style>
<p>Dear</p><p class="bold">Mr/Ms.______,We are pleased to inform you that you have been
shortlisted for an interview process with CyberGroup.The details of interview are as below:
</p>
<table>
   <tr>
     <td  class="bold">Job ID:</td>
     <td>${jdJson._id}</td>
   </tr>
   <tr>
     <td  class="bold">Designation:</td>
     <td>${jdJson.appliedFor}</td>
   </tr>
   <tr>
     <td class="bold">No Of Rounds:</td>
     <td>${interviewObj.noOfRounds}</td>
   </tr>
   <tr>
     <td class="bold">Date/Time:</td>
     <td>${interviewObj.date}</td>
   </tr>
   <tr>
   <td class="bold">Address:</td>
   <td> B-9, Block B, Sector 3, Noida, Uttar Pradesh 201301</td>
 </tr>
</table>
<a href="#">Please signup if you wish to accept and proceed with our process</a>
<br>
<em class="bottom">This is automatically generated email,please do not reply</em>
<p>Thanks</p>
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRCUuWWhu0HByWgdDAp2cA1TDf-a_
          FpjUA_DFbRt33DViY9tNDH&usqp=CAU"width="100"height="100">
  
`;
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
     to:email, // list of receivers
     subject: "Cybergroup  Contact Request", // Subject line
     text: "Welcome to Cybergroup ", // plain text body
     html:output,
     attachments: [{
      filename: jdJson.jdName+".pdf",
       path: 'C:/Users/deepanshu.balani/Desktop/Interview Management System/ARMS/api/jobDescriptions/'+jdJson.jdName+'.pdf',
      contentType: 'application/pdf'
    }],
   }
   transporter.sendMail(info,function(err,data){
      
     if(err){
          console.error("error occurs",err);
        }
        else{
           console.log("email sent successfully");
        }
   });
  }catch(error){
    console.error(error);
  }
}

module.exports=nodeMail