const pagination = require("../generic/pagination")

class Base {
    constructor(model){
        this.model = model;
    }

    async save(req, res){
        await this.model.save(req.body);
    }

    async get(req, res){
        await this.model.get(req.params.id);
    }

    async modify(req, res){
        await this.model.modify(req.params.id, req.body);
    }

    async remove(req, res){
        await this.model.remove(req.params.id);
    }

    async searchRecord(req, res){
        try{
            let queryObject = { $regex: req.params.searchBy, $options: 'i'};
            const searchedRecords = await this.model.getAll({name: queryObject});
            res.status(200).send({
                success: true,
                payload: {
                    data : {
                        searchedRecords
                    },
                    message: "List of Searched Records returned successfully!!"
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

    async getAll(req,res){
        
        try{
            const recordList = await this.model.getAll();
            const page = parseInt(req.query.page) || 1;
            const pageSize = 10;
            const pager = await pagination.paginate(recordList.length, page, pageSize);
            const pageOfItems = recordList.slice(pager.startIndex, pager.endIndex + 1);
            
            res.status(200).send({
                success : true,
                data : {
                    pager : pager,
                    listOfData : pageOfItems,
                    message : "List of Data returned successfully!!"
                }
            })
        }

        catch(err){
            console.log(err)
            res.status(400).send({
                success: false,
                payload: {
                    message: err.message
                }
            });
        }
    }

    
}

module.exports = Base;