const controller = require('../controllers');
var passport=require("passport");
module.exports=(app) =>
{ 
    // Sample get route
    // app.get('/login', controller.);
    app.post('/api/interview', controller.interview.createInterview);
    app.patch('/api/interview/:id', controller.interview.updateInterview);
    app.delete('/api/interview/:id', controller.interview.deleteInterview);
    app.get('/api/interview/:id', controller.interview.getInterview);

  //authentication routes
app.get('/api/google', passport.authenticate('google', {
  scope: ['profile']
})); 
 //callback Route for google to redirect
app.get("/api/google/redirect",controller.login.redirect);

}
