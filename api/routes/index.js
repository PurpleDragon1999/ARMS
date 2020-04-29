const controller = require('../controllers');
const roleChecker = require('../middlewares/roleChecker');
const authorize = require('../middlewares/tokenVerifier');
var multer  = require('multer');
var fs  = require('fs');
var fileName;
const dir = './cvUploads';
const upload = require('../middlewares/csvUpload');

// let storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//       if (!fs.existsSync(dir)){
//        fs.mkdirSync(dir);
//       }
//       callback(null, dir);
//     },
//     filename: (req, file, callback) => {
//         fileName = Date.now() + '-' + file.originalname;
//         callback(null, fileName);
//     }
// });
// let upload = multer({storage: storage});

module.exports = (app) =>
{ 
    app.get("/api/employeeBySearch/:searchBy", (req, res)=>controller.employee.searchRecord(req, res));
    //Employee
    app.post('/api/employee', (req, res) => controller.employee.save(req, res));
    app.get('/api/employee/:id', (req, res) => controller.employee.get(req, res));
    app.get('/api/employee', (req, res) => controller.employee.getAll(req, res));
    app.put('/api/employee/:id', (req, res) => controller.employee.modify(req, res));
    app.delete('/api/employee/:id', authorize, roleChecker.checkForAdmin, (req, res) => controller.employee.remove(req, res));
    app.post('/api/employee/bulk', upload.single('csvUpload'), (req, res) => controller.employee.bulk(req, res));

    //Routes for Interview
   
    app.post('/api/interview', (req, res) => controller.interview.create(req, res));
    app.patch('/api/interview/:id', (req, res) => controller.interview.update(req, res));
    app.delete('/api/interview/:id', (req, res) => controller.interview.delete(req, res));
    app.get('/api/interview/:id', (req, res) => controller.interview.get(req, res));

    app.post('/api/round/:id', controller.round.createRound);

    //Routes for Job Description
    // app.post('/api/jobDescription',controller.jobDescription.createJd);    
    app.get('/api/jobDescription',controller.jobDescription.showAllJds);
    app.get('/api/jobDescription/:id',controller.jobDescription.showJd);
    app.put('/api/jobDescription/:id',controller.jobDescription.updateJd);	
    app.delete('/api/jobDescription/:id',controller.jobDescription.deleteJd);	

   //Routes for Candidate
    app.get("/api/candidates", (req, res)=>controller.candidate.getAll(req, res));
    app.get("/api/candidateBySearch/:searchBy", (req, res)=>controller.candidate.searchRecord(req, res));
    app.post('/api/candidate',upload.single('file'), (req,res)=> controller.candidate.uploadDetails(req,res));
    //check validity of employee for ARMS
    app.post("/api/checkvalidemployee",controller.login.checkValidEmployee);
}
