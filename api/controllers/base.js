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
        await this.model.modify(req.params.id, req.body);
    }

    async remove(req, res){
        await this.model.remove(req.params.id);
    }
}

module.exports = Base;