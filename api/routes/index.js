const controller = require('../controllers');
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

    //Routes for Job Description
    app.post('/api/jobDescription',controller.jobDescription.createJd);
	app.get('/api/jobDescription',controller.jobDescription.showAllJds);
	app.get('/api/jobDescription/:id',controller.jobDescription.showJd);
	app.put('/api/jobDescription/:id',controller.jobDescription.updateJd);	
	app.delete('/api/jobDescription/:id',controller.jobDescription.deleteJd);	

    
    app.post('/api/interview', controller.interview.createInterview);
    app.patch('/api/interview/:id', controller.interview.updateInterview);
    app.delete('/api/interview/:id', controller.interview.deleteInterview);
    app.get('/api/interview/:id', controller.interview.getInterview);
}