const controller = require('../controllers');
module.exports=(app) =>
{ 
    // Sample get route
    // app.get('/login', controller.);
    app.post('/interview', controller.interview.createInterview);
    app.patch('/interview/:id', controller.interview.updateInterview);
    app.delete('/interview/:id', controller.interview.deleteInterview);
    app.get('/interview/:id', controller.interview.getInterview);
}