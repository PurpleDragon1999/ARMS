const controller = require('../controllers');
module.exports=(app) =>
{ 
    //Employee
    app.post('/api/employee', (req, res) => controller.employee.save(req, res));
    app.get('/api/employee/:id', (req, res) => controller.employee.get(req, res));
    app.get('/api/employee', (req, res) => controller.employee.getAll(req, res));
    app.put('/api/employee/:id', (req, res) => controller.employee.modify(req, res));
    app.delete('/api/employee/:id', (req, res) => controller.employee.remove(req, res));
    
    //Job Description
    app.post('/api/jobDescription',controller.jobDescription.createJd);
    app.get('/api/jobDescription',controller.jobDescription.showAllJds);
    app.get('/api/jobDescription/:id',controller.jobDescription.showJd);
    app.put('/api/jobDescription/:id',controller.jobDescription.updateJd);	
    app.delete('/api/jobDescription/:id',controller.jobDescription.deleteJd);	

    //Candidate
    app.get("/api/candidates", (req, res)=>controller.candidate.getAll(req, res));
    app.get("/api/candidateBySearch/:searchBy", (req, res)=>controller.candidate.searchRecord(req, res));

    //Interview    
    app.post('/api/interview', controller.interview.createInterview);
    app.patch('/api/interview/:id', controller.interview.updateInterview);
    app.delete('/api/interview/:id', controller.interview.deleteInterview);
    app.get('/api/interview/:id', controller.interview.getInterview);

    //Candidate
    app.get("/api/candidates", (req, res)=>controller.candidate.getAll(req, res));
    app.get("/api/candidateBySearch/:searchBy", (req, res)=>controller.candidate.searchRecord(req, res));    
}
