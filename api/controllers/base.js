const pagination = require("../generic/pagination");

class Base {
  constructor(model) {
    this.model = model;
  }

  async save(req, res, successMessage) {
    try {
      const data = await this.model.save(req.body);
      return res.send({
        success: true,
        payload: {
          data,
          message: successMessage || "Created Successfully",
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

  async modify(req, res, successMessage) {
    try {
      const data = await this.model.modify(req.params.id, req.body);
      return res.send({
        success: true,
        payload: {
          data,
          message: successMessage || "Modified Successfully",
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

  async remove(req, res, successMessage) {
    try {
      await this.model.remove(req.params.id);
      return res.send({
        success: true,
        payload: {
          message: successMessage || "Removed Successfully",
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

  async get(req, res, successMessage) {
    try {
      const data = await this.model.get(req.params.id);
      return res.send({
        success: true,
        payload: {
          data,
          message:  successMessage || "Retrieved Successfully",
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

  async index(req, res) {
    try {
      const data = await this.model.index();
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

  async searchRecord(req, res) {
    try {
      let queryObject = {
        $regex: ".*^" + req.query.character + ".*",
        $options: "i",
      };
      
      const searchedRecords = await this.model.getAll({ name: queryObject });
      req.body.records = searchedRecords;
      return this.getPaginatedResult(req, res);
    } catch (err) {
      res.status(500).send({
        success: false,
        payload: {
          message: err.message,
        },
      });
    }
  }

  async getPaginatedResult(req, res) {
    try {
      const recordList =
        req.body.records || (await this.model.getAll());
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
      return res.status(200).send({
        success: true,
        payload: {
          data: {
            dataList: pageOfItems,
            pager: pager,
          },
          message: "List of Paginated Data returned successfully!!",
        },
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        payload: {
          message: err.message,
        },
      });
    }
  }
}

module.exports = Base;
