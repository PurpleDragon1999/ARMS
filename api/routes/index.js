const controller = require('../controllers');
module.exports=(app) =>
{ 
    // Sample get route
    // app.get('/login', controller.);
    app.post('/api/interview', controller.interview.createInterview);
    app.patch('/api/interview/:id', controller.interview.updateInterview);
    app.delete('/api/interview/:id', controller.interview.deleteInterview);
    app.get('/api/interview/:id', controller.interview.getInterview);
}