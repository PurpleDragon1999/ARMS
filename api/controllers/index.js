const employee = require('./employee');
const interview = require('./interview')
<<<<<<< HEAD
const login=require('./login');
const candidate=require('./candidate');
const mailer=require('./mailHelper');
module.exports = {
    login:login,
    employee:employee,
    interview:interview,
    candidate:candidate,
    mailer:mailer
    
=======
const candidate = require("./candidate")

module.exports = {
    employee,
    interview,
    candidate
>>>>>>> e6028e28d4d6b4345a3f13439859ffc9783ab1be
}