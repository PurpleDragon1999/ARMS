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

  // async getAll(req, res){
  //     try{
  //         const data = await this.model.getAll();
  //         return res.send({
  //             success: true,
  //             payload: {
  //                 data,
  //                 message: 'Retrieved Successfully'
  //             }
  //         });
  //     }catch(e){
  //         res.status(500).send({
  //             success: false,
  //             payload: {
  //                 message: e.message
  //             }
  //         })
  //     }
  // }
  async index(req, res) {
    try {
      const data = await this.model.index();
      // if(!data)
      // {
      //     return res.status(404).send({
      //                       payload: {
      //                       data,
      //                       message: "List has no items!"
      //                       }
      //                     });
      // }
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

  async modify(req, res) {
    try {
      const data = await this.model.modify(req.params.id, req.body);
      return res.send({
        success: true,
        payload: {
          data,
          message: "Modified Successfully",
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

  async searchRecord(req, res) {
    try {
      let searchBy = req.query.searchBy;
      let queryObject = { $regex: ".*^" + searchBy + ".*", $options: "i" };
      const searchedRecords = await this.model.getAll({
        $or: [
          { name: queryObject },
          { designation: queryObject },
          { email: queryObject },
        ],
      });
      console.log(searchedRecords);
      if (searchedRecords.length != 0) {
        res.status(200).send({
          success: true,
          payload: {
            data: {
              searchedRecords,
            },
            message: "List of Searched Records returned successfully!!",
          },
        });
      } else {
        res.send({
          success: false,
          payload: {
            data: {
              searchedRecords: [],
            },
            message: "No Match Found",
          },
        });
      }
    } catch (err) {
      res.status(400).send({
        success: false,
        payload: {
          message: err.message,
        },
      });
    }
  }

  async getAll(req, res) {
    try {
      const recordList = await this.model.getAll();
      const page = parseInt(req.query.page) || 1;
      console.log(page, "inside api");
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
            dataList: pageOfItems,
            pager: pager,
          },
          message: "List of Data returned successfully!!",
        },
      });
    } catch (err) {
      res.status(400).send({
        success: false,
        payload: {
          message: err.message,
        },
      });
    }
  }
}

module.exports = Base;
