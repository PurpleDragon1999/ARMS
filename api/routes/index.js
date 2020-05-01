const controller = require("../controllers");
const upload = require("../middlewares/csvUpload");

module.exports = (app) => {
  //Employee
  app.post("/api/employee", (req, res) => controller.employee.save(req, res));
  
  app.get("/api/employeeSearch", (req, res) =>
    controller.employee.searchRecord(req, res)
  );

  app.get("/api/employee", (req, res) =>
    controller.employee.getPaginatedResult(req, res)
  );
  
  app.put("/api/employee/:id", (req, res) =>
    controller.employee.modify(req, res)
  );

  app.get("/api/employee/:id", (req, res) => controller.employee.get(req, res));

  app.delete("/api/employee/:id", (req, res) =>
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
  // app.delete('/api/interview/:id', (req, res) => controller.interview.delete(req, res));
  app.get("/api/interview/:id", (req, res) =>
    controller.interview.get(req, res)
  );

  //Routes for Job Description
  //app.post('/api/jobDescription',controller.jobDescription.createJd);

  //Job Description
  // app.post('/api/jobDescription',controller.jobDescription.createJd);
  //   app.get("/api/jobDescription", controller.jobDescription.showAllJds);
  //   app.get("/api/jobDescription/:id", controller.jobDescription.showJd);
  //   app.put("/api/jobDescription/:id", controller.jobDescription.updateJd);
  //   app.delete("/api/jobDescription/:id", controller.jobDescription.deleteJd);

  //Routes for Candidate
  app.get("/api/candidates", (req, res) =>
    controller.candidate.getPaginatedResult(req, res)
  );
  app.get("/api/candidate/search/:searchBy", (req, res) =>
    controller.candidate.searchRecord(req, res)
  );
  // app.post('/api/candidate',upload.single('file'), (req,res)=> controller.candidate.uploadDetails(req,res));
};
