const models = require("../models")

class Employee {
    constructor(){
    }

    async searchEmployee(req, res){
        
        let queryObject = { $regex: req.params.name, $options: 'i'};
        const employees = await models.employee.get({name: queryObject});
        res.send({
            success: true,
            payload: {
                data : {
                    employees
                },
                message: "list of searched employees returned successfully!!"
            }
        });

    }
}

module.exports = new Employee();