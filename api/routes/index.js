const controller = require('../controllers');
var multer  = require('multer');
var fs  = require('fs');
var fileName;
const dir = './cvUploads';

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
      if (!fs.existsSync(dir)){
       fs.mkdirSync(dir);
      }
      callback(null, dir);
    },
    filename: (req, file, callback) => {
        fileName = Date.now() + '-' + file.originalname;
        callback(null, fileName);
    }
});
let upload = multer({storage: storage});



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
    app.post('/api/interview', (req, res) => controller.interview.create(req, res));
    app.patch('/api/interview/:id', (req, res) => controller.interview.update(req, res));
    app.delete('/api/interview/:id', (req, res) => controller.interview.delete(req, res));
    app.get('/api/interview/:id', (req, res) => controller.interview.get(req, res));
    app.post('/api/candidate',upload.single('file'), (req,res)=> controller.candidate.uploadDetails(req,res));
}