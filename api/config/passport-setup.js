const passport=require('passport');
// const googleStrategy=require('passport-google-oauth20').Strategy;
const outlookStrategy=require('passport-azure-oauth').Strategy
const keys=require("./keys")
passport.use("provider",
    new outlookStrategy({
  //options for strategy
    callbackURL:"http://localhost:3000/api/outlook/redirect",
    clientId:keys.outlook.clientID,
    clientSecret:keys.outlook.clientSecret,
    tenantId:keys.outlook.tenantID,
    resource: '00000002-0000-0000-c000-000000000000',
    prompt: 'login',
    state: false
    
   },(accessToken,refreshToken,profile,done)=>{
     //passport callback function
     console.log("passport callback function fired");
     console.log(profile);
     console.log(accessToken);
   
   })
)