const controller = require('../controllers');
const roleChecker = require('../middlewares/roleChecker');
const authorize = require('../middlewares/tokenVerifier');
const upload = require('../middlewares/csvUpload');
const fileUpload = require('../middlewares/fileUpload');

module.exports = (app) => {
  //Employee
  app.post("/api/employee", (req, res) => controller.employee.save(req, res));

  app.get("/api/employeeSearch", (req, res) =>
    controller.employee.searchRecord(req, res)
  );

  app.get("/api/employee", (req, res) =>
    controller.employee.getPaginatedResult(req, res)
  );

  app.get("/api/employee/:id", (req, res) => controller.employee.get(req, res));

  app.put("/api/employee/:id", (req, res) =>
    controller.employee.modify(req, res)
  );
  app.delete('/api/employee/:id', (req, res) =>
    controller.employee.remove(req, res)
  );
  app.post("/api/employee/bulk", upload, (req, res) =>
    controller.employee.bulk(req, res)
  );

  //Routes for Interview
  app.post("/api/interview", (req, res) => controller.interview.save(req, res));
  app.patch("/api/interview/:id", (req, res) =>
    controller.interview.modify(req, res)
  );
  app.delete('/api/interview/:id', (req, res) => controller.interview.remove(req, res));
  app.get("/api/interview/:id", (req, res) =>
    controller.interview.get(req, res)
  );
  app.get("/api/interview", (req, res) =>
    controller.interview.index(req, res)
  );
  app.get("/api/interviewSearch", (req, res) =>
    controller.interview.searchRecord(req, res)
  );

  //Routes for Job Description
  app.post("/api/jobDescription", controller.jobDescription.save);
  app.get("/api/jobDescription", (req, res) =>
    controller.jobDescription.index(req, res)
  );
  app.get("/api/jobDescription/:id", (req, res) => controller.jobDescription.get(req, res));
  app.put("/api/jobDescription/:id", (req, res) => controller.jobDescription.modify(req, res));
  app.delete("/api/jobDescription/:id", (req, res) =>
    controller.jobDescription.remove(req, res)
  );

  //Routes for Candidate
  app.get("/api/candidates", (req, res) =>
    controller.candidate.getAll(req, res)
  );

  app.get("/api/candidateSearch", (req, res) =>
    controller.candidate.getAll(req, res)
  );

  app.get("/api/candidate/:id", (req, res) => controller.candidate.get(req, res));
  app.put("/api/candidate/:id", (req, res) => controller.candidate.modify(req, res))
  app.post("/api/candidate", fileUpload, (req, res) =>
    controller.candidate.save(req,res)
  );

  app.post("/api/checkvalidemployee", (req, res) =>
    controller.login.checkValidEmployee(req, res)
  );
  // app.post('/api/candidate',upload.single('file'), (req,res)=> controller.candidate.uploadDetails(req,res));
  app.post("/api/candidate", fileUpload, (req, res) =>
    controller.candidate.save(req, res)
  );
  
  //login route
  app.post("/api/checkValidEmployee", controller.login.checkValidEmployee);
  // route to send email to candidates who have applied to job
  app.post("/api/jdEmail",(req,res)=>controller.email.sendEmail(req,res));
};
