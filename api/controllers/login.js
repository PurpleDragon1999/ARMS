
const jwt = require("jsonwebtoken");
var passport=require("passport");

class login{
  
constructor(){}
 redirect(req,res,err){
  const privateKEY = "qmnwnmekjejohrfcgtlmknlkycxxdfxulkmnklnklnilkomncp";
    if (err ==='TokenError') {
        res.redirect('/api/outlook'); // redirect them back to the login page
       } else {
        // Handle other errors here
       }
       const token = jwt.sign(
        {
          _id: req.user._id,
          employeeId: req.user.employeeId,
          name: req.user.name,
          role: req.user.role,
          email:req.user.email
          
        },
         privateKEY,
        { expiresIn: 86400 }
      );
    
      res.send({
        success: true,
        payload: {
          data: {
            "x-auth-token": token
          }
        },
        message: "Logged in successfully!!"
      });
      
    
  
  }
  logout(req,res){
      //handle with passport
      res.send("logging you out");
  }
}
    module.exports=new login();



    
