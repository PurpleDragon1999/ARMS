const controller = require('../controllers');
module.exports=(app) =>
{ 
    // Sample get route
    // app.get('/login', controller.);

    //Routes for Job Description
    app.post('/api/jobDescription',controller.jobDescription.createJd);
	app.get('/api/jobDescription',controller.jobDescription.showAllJds);
	app.get('/api/jobDescription/:id',controller.jobDescription.showJd);
	app.put('/api/jobDescription/:id',controller.jobDescription.updateJd);	
	app.delete('/api/jobDescription/:id',controller.jobDescription.deleteJd);	

    
}