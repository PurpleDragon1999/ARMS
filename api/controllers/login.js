
var AzureOAuth2Strategy  = require("passport-azure-oauth2");
var passport=require("passport");
class login{
constructor(){}
 redirect(req,res,err){
       debugger
    if (err ==='TokenError') {
        res.redirect('/google'); // redirect them back to the login page
       } else {
        // Handle other errors here
       }
   res.send("you have reached callback URL");
  }
  logout(req,res){
      //handle with passport
      res.send("logging you out");
  }
}
    module.exports=new login();



    
