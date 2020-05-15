const model=require('../models');
const nodeMail=require('../middlewares/mailHelper')
class Email {
  constructor(){

  }
  async sendEmail(req,res){ 
      try{
     const jdObject=await model.jobDescription.get({jdId:req.body.jdId}); 
      const output = `<style>
       .bottom{
        color:grey;
        font-size:0.8rem;
        }
         .bold{
            font-weight:bolder;
          }
      </style>
       <p>Hello</p>
  
       <p>Thank You for expressing your Interest for the position of ${jdObject.jdTitle}
         ,You can read more about us on our company career page </p>

         <a href="www.cygrp.com/careers">www.cygrp.com/careers</a>
  
         <p>Please signup if you wish to accept and proceed with our process</p>
 
         <a href="http://localhost:4200/candidateForm/${jdObject.jdId}">Click here to apply.</a>
         <p>Regards,</p>
 
         <p>HR,</p>
         <p> Cybergroup,B-9, Block B, Sector 3, Noida, Uttar Pradesh 201301</p>
         <p>Thanks</p>
         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRCUuWWhu0HByWgdDAp2cA1TDf-a_
                   FpjUA_DFbRt33DViY9tNDH&usqp=CAU"width="150"height="150">
          <br>
         <em class="bottom">This is automatically generated email,please do not reply</em>
         `;
         nodeMail(req.body.mailList,output,jdObject);
         res.status(200).send({
               succcess:true,
               payload:{
                  message:"Email to candidates sent successfully."
                }
            })

      }catch(error){
        res.status(500).send({
            success: false,
            payload: {
              message: error.message,
            },
          });

      }
    }
}
module.exports=new Email()