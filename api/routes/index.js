const controller = require('../controllers');
module.exports=(app) =>
{ 
    // Sample get route
    // app.get('/login', controller.);

    app.get("/api/employeeByName/:name", controller.employee.searchEmployee);
    app.get("/api/employees", controller.employee.index);
}


