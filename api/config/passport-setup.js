const passport=require('passport');
const googleStrategy=require('passport-google-oauth20').Strategy;
const keys=require("./keys")
passport.use(
    new googleStrategy({
  //options for strategy
    callbackURL:"google/redirect",
    clientID:keys.google.clientID,
    clientSecret:keys.google.clientSecret
   },(accessToken,refreshToken,profile,done)=>{
     //passport callback function
     console.log("passport callback function fired");
     console.log(profile);

   })
)