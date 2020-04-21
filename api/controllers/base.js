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

    async getAll(req, res){
        await this.model.getAll();
    }

    async modify(req, res){
        console.log(req, res, ' req, res ');
        await this.model.modify(req.params.id, req.body);
    }

    async remove(req, res){
        await this.model.remove(req.params.id);
    }

    async create(req,res){
        try{    
            let objToCreate=req.body;
            let createdObj = await this.model.save(objToCreate);
            return res.send({
                    success: true,
                    payload: {
                        body: createdObj,
                        message: "created successfully"
                    }
                });

        }
        catch(error){
            res.send({
                success: false,
                payload: {
                    message: error.message
                }
            });
        }
    }

    async update(req,res){
        try{
            const objToUpdate = await this.model.findOne({_id: req.params.id});
            if(objToUpdate==null){
                return res.send({
                    success: true,
                    payload: {
                        message: "no record found"
                    }
                });
            }
            else{
                let updateObj= req.body;
                let updatedStatus = await this.model.updateOne({_id: req.params.id}, updateObj)
                return res.send({
                    success: true,
                    payload: {
                        body: updatedStatus,
                        message: "updated successfully"
                    }
                });
            }
        }
        catch(error){
            console.log(error)
            return res.send({
                success: false,
                payload: {
                    message: error.message
                }
            });
        }
        
    }

    async delete(req,res){
        try{
            const objToDelete = await this.model.findOne({_id: req.params.id});
            if(objToDelete==null){
                res.send({
                    success: true,
                    payload: {
                        message: "no record found"
                    }
                });
            }
            else{
                let deletedStatus = await this.model.deleteOne({_id: req.params.id});
                res.send({
                    success: true,
                    payload: {
                        body: deletedStatus,
                        message: "deleted successfully"
                    }
                });
            }
        }
        catch(error){
            res.send({
                success: false,
                payload: {
                    message: error.message
                }
            });
        }
    }

    async get(req,res){
        try{
            const objToRetrieve = await this.model.findOne({_id: req.params.id});
            if(objToRetrieve==null){
                res.send({
                    success: true,
                    payload: {
                        message: "no record found"
                    }
                });
            }
            else{
                res.send({
                    success: true,
                    payload: {
                        body: objToRetrieve,
                        message: "showing details"
                    }
                });
            }

        }
        catch(error){
            res.send({
                success: false,
                payload: {
                    message: error.message
                }
            });
        }
    }
}

module.exports = Base;