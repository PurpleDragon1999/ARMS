const model=require('../models')
const jwt_decode=require("jwt-decode");
const config = require("config");
const jwt = require("jsonwebtoken");


class Login{
   constructor(){}

  async checkValidEmployee(req,res){
     try{
         const data=jwt_decode(req.body.idToken);
         const employeeObj=await model.employee.getByCriteria({email:data.email});
         const token = jwt.sign(
            {
              _id: employeeObj._id,
              empId: employeeObj.employeeId,
              name: employeeObj.name,
              role: employeeObj.role,
              email: employeeObj.email
            },
            config.get("jwtPrivateKey"),
            { expiresIn: 86400 }
          );
         if(employeeObj!=null){
            res.status(200).send({
                success:true,
                   payload:{
                     message:"Employee exists in database",
                     data:{
                        "x-auth-token":token
                     }
                  }
            })
        }else{
           res.status(401).send({
              success:true,
                 payload:{
                   message:"You are unauthorized on ARMS"
                }

            });
        }
   }catch(error){
     res.status(500).send({
         success:false,
          payload:{
              message:error.message
          }
        })
    }
}
}
module.exports=new Login()