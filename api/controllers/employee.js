const models = require("../models")
const pagination = require("../generic/pagination")

class Employee {
    constructor(){
    }

    async searchEmployee(req, res){
        try{
            let queryObject = { $regex: req.params.name, $options: 'i'};
            const employees = await models.employee.get({name: queryObject});
            res.status(200).send({
                success: true,
                payload: {
                    data : {
                        employees
                    },
                    message: "list of searched employees returned successfully!!"
                }
            });

        }
        catch(err){
            res.status(400).send({
                success: false,
                payload: {          
                    message: err.message
                }
            });
        }
    }

    async index(req,res){
        try{
            const employeeList = await models.employee.get();
            const page = parseInt(req.query.page) || 1;
            const pageSize = 10;
            const pager = await pagination.paginate(employeeList.length, page, pageSize);
            const pageOfItems = employeeList.slice(pager.startIndex, pager.endIndex + 1);
            
            res.status(200).send({
                success : true,
                data : {
                    pager : pager,
                    listOfData : pageOfItems,
                    message : "list of data returned successfully!!"
                }
            })
        }

        catch(err){
            res.status(400).send({
                success: false,
                payload: {
                    message: err.message
                }
            });
        }
    }
}

module.exports = new Employee();