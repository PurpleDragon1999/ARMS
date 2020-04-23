const passport=require('passport');
const model=require("../models");
require('https').globalAgent.options.rejectUnauthorized = false;
// const googleStrategy=require('passport-google-oauth20').Strategy;
const outlookStrategy=require('passport-azure-oauth').Strategy
var jwt= require("jwt-simple");
const keys=require("./keys");
//serialize funcction
/* passport.serializeUser(function(user, done) {
 
  done(null, user.id);
});
//deserialize function
passport.deserializeUser(function(id, done) {
  var employeeObj= model.employee.get(id);
  console.log(employeeObj);
  done(null, employeeObj);
}); */
passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(email, done) {
  var employeeObj= model.employee.get(email);
 
  done(null, employeeObj);
  done(null, user);
});


passport.use("provider",

    new outlookStrategy({
  //options for strategy
    
    callbackURL:"https://localhost:3000/api/outlook/redirect",
    clientId:keys.outlook.clientID,
    clientSecret:keys.outlook.clientSecret,
    tenantId:keys.outlook.tenantID,
     resource: '00000003-0000-0000-c000-000000000000',
     prompt: 'login',
     static:false
    
   },async function(err,accessToken,refreshToken,profile,done){
      debugger
     //passport callback function
     var user = jwt.decode(refreshToken.id_token, "", true);
       
        console.log("passport callback function fired");
       var employeeObj= await model.employee.getbyEmail(profile.username);
         //if not create new employee in db
       if(employeeObj){
         console.log("this employee already exists");
         done(null,employeeObj);
      
       }else{
       newEmployee ={
          email:profile.username,
          name:profile.displayname,
          designation:"intern",
          role:"hr",
          employeeId:"CGI015"
        };
         done(null,user);
        await model.employee.save(newEmployee);
      } 
     
   })
  
)


