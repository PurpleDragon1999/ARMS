const pagination = require("../generic/pagination")

class Base {
    constructor(model){
        this.model = model;
    }
    
    
    async save(req, res, successMessage) {
        try {
        const data = await this.model.save(req.body);
        return res.send({
            success: true,
            payload: {
            data,
            message: successMessage || "Created Successfully"
            },
        });
        } catch (e) {
        res.status(500).send({
            success: false,
            payload: {
            message: e.message,
            },
        });
        }
    }

    async get(req, res) {
        try {
        const data = await this.model.get(req.params.id);
        
        return res.send({
            success: true,
            payload: {
            data,
            message: "Retrieved Successfully",
            },
        });
        } catch (e) {
        res.status(500).send({
            success: false,
            payload: {
            message: e.message,
            },
        });
        }
    }
  

  
  
  async index(req, res){
        try{
            const data = await this.model.index();
            return res.send({
                success: true,
                payload: {
                    data,
                    message: 'Retrieved Successfully'
                }
            });
        }catch(e){
            res.status(500).send({
                success: false,
                payload: {
                    message: e.message
                }
            })
        }
    }


    async create(req,res){
        try{    
            let objToCreate=req.body;
            let createdObj = await this.model.save(objToCreate);
            return res.send({
                    success: true,
                    payload: {
                        body: createdObj,
                        message: "Record created successfully!!"
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
                        message: "No record found"
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
                        message: "Record updated successfully!!"
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
                        message: "No record found"
                    }
                });
            }
            else{
                let deletedStatus = await this.model.deleteOne({_id: req.params.id});
                res.send({
                    success: true,
                    payload: {
                        body: deletedStatus,
                        message: "Record deleted successfully!!"
                    }
                })
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

    
    
    async remove(req, res) {
        try {
        const data = await this.model.remove(req.params.id);
        return res.send({
            success: true,
            payload: {
            data,
            message: "Removed Successfully",
            },
        });
        } catch (e) {
        res.status(500).send({
            success: false,
            payload: {
            message: e.message,
            },
        });
        }
    }



    async searchRecord(req, res){
        try{
            let queryObject = { $regex: req.params.searchBy, $options: 'i'};
            const searchedRecords = await this.model.getAll({name: queryObject});
            if (searchedRecords.length != 0){
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
            else{
                res.status(200).send({
                    success: true,
                    payload: {
                        message: "No Results Found"
                    }
                });
            }
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

    async get(req,res){
        try{
            const objToRetrieve = await this.model.findOne({_id: req.params.id});
            if(objToRetrieve==null){
                res.send({
                    success: true,
                    payload: {
                        message: "No record"
                    }
                });
            }
            else{
                res.send({
                    success: true,
                    payload: {
                        body: objToRetrieve,
                        message: "Details retrieved successfully!!"
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

    async uploadDetails(req,res){
        try{
            let path = "";
            if (req.file) {
                path = req.file.path;
            }
            let objToCreate={
                name: req.body.name,
                experience: req.body.experience,
                email: req.body.email,
                cv: path,
                skills: req.body.skills,
                appliedFor: req.body.appliedFor
            } 
            let createdObj = await this.model.save(objToCreate);
            return res.send({
                    success: true,
                    payload: {
                        body: createdObj,
                        message: "Record created successfully!!"
                    }
                });
        }
        catch(error){
            res.send({
                success: false,
                payload: {
                    message: error.message
                }
            })
        }
    }
   
    
  async getAll(req, res) {
    try {
      const recordList = await this.model.getAll();
      const page = parseInt(req.query.page) || 1;
      const pageSize = 5;
      const pager = await pagination.paginate(
        recordList.length,
        page,
        pageSize
      );
      const pageOfItems = recordList.slice(
        pager.startIndex,
        pager.endIndex + 1
      );
      res.status(200).send({
        success: true,
        payload: {
          data: {
            dataList : pageOfItems,
            pager : pager
          },
          message: "List of Data returned successfully!!",
        },
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        payload: {
          message: err.message,
        },
      });
    }

}
}

module.exports = Base;