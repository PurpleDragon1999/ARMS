const controller = require('../controllers');
var passport=require("passport");
module.exports=(app) =>
{ 
    //Employee
    app.post('/api/employee', controller.employee.save);
    app.get('/api/employee/:id', controller.employee.get);
    app.get('/api/employee', controller.employee.getAll);
    app.patch('/api/employee/:id', controller.employee.modify);
    app.delete('/api/employee/:id', controller.employee.remove);
    // Sample get route
    // app.get('/login', controller.);
    app.post('/api/interview', controller.interview.createInterview);
    app.patch('/api/interview/:id', controller.interview.updateInterview);
    app.delete('/api/interview/:id', controller.interview.deleteInterview);
    app.get('/api/interview/:id', controller.interview.getInterview);

  //authentication routes
app.get('/api/outlook', passport.authenticate('provider', {
  scope: ['profile']
}), function(req, res){ 
  var user = jwt.decode(req.user, "", true);
  res.send("profile", { user : user});
    }
); 
 //callback Route for google to redirect
app.get("/api/outlook/redirect",passport.authenticate('provider'),controller.login.redirect);

}
