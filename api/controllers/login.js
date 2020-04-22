

var passport=require("passport");
class login{
constructor(){}
 redirect(req,res,err){
       
    if (err ==='TokenError') {
        res.redirect('/api/outlook'); // redirect them back to the login page
       } else {
        // Handle other errors here
       }
       debugger
       var user = jwt.decode(req.user, "", true);
       return res.send("profile", { user : user});
       
  
  }
  logout(req,res){
      //handle with passport
      res.send("logging you out");
  }
}
    module.exports=new login();



    
