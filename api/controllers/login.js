const model=require('../models')
class Login{
  constructor(){}

  async checkValidEmployee(req,res){
     try{
      
         const employeeObj=await model.employee.get({email:req.body.mail});
         if(employeeObj!=null){
            res.status(200).send({
                success:true,
                   payload:{
                     message:"this employee exists in our db",
                     data:employeeObj
                  }
           })
        }else{
           res.status(401).send({
              success:true,
                 payload:{
                   message:"you are unauthorized on ARMS"
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