class Base {
    constructor(model){
        this.model = model;
    }

    async save(req, res){
        try{
            const data = await this.model.save(req.body);
            return res.send({
                success: true,
                payload: {
                    data,  
                    message: 'Created Successfully'
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

    async get(req, res){
        try{
            const data = await this.model.get(req.params.id);
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

    async getAll(req, res){
        try{
            const data = await this.model.getAll();
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

    async modify(req, res){
        try{
            const data = await this.model.modify(req.params.id, req.body);
            return res.send({
                success: true,
                payload: {
                    data,  
                    message: 'Modified Successfully'
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

    async remove(req, res){
        try{
            const data = await this.model.remove(req.params.id);
            return res.send({
                success: true,
                payload: {
                    data,  
                    message: 'Removed Successfully'
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
}

module.exports = Base;