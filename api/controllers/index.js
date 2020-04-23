const employee = require('./employee');
const interview = require('./interview')
const login=require('./login');
const candidate=require('./candidate');
const mailer=require('./mailHelper');
module.exports = {
    login:login,
    employee:employee,
    interview:interview,
    candidate:candidate,
    mailer:mailer
    
}