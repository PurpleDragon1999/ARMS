const passport=require('passport');
const model=require("../models");
require('https').globalAgent.options.rejectUnauthorized = false;
// const googleStrategy=require('passport-google-oauth20').Strategy;
const outlookStrategy=require('passport-azure-oauth').Strategy
var jwt= require("jwt-simple");
const keys=require("./keys")
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
     var user = profile.raw
      done(null, user);
     console.log("passport callback function fired");
     console.log(profile);
     console.log(accessToken);
     newEmployee ={
        email:profile.username,
        name:profile.displayname,
        designation:"intern",
        role:"hr",
        employeeId:"CGI013"

     };
     await model.employee.save(newEmployee);
     
   })
  
   
)
passport.serializeUser(function(user, done) {
  //console.log("profile : ", user);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  //console.log("profile : ", user);
  done(null, user);
});