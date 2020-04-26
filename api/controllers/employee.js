const Joi = require("@hapi/joi");
const Base = require("./base");
const employeeModel = require("../models/employee");

function validateEmployee(employee) {
  //for removing unnecessary spaces
  for (let key in employee) {
    employee[key] = employee[key].toString().trim();
  }

  const schema = Joi.object({
    employeeId: Joi.number().min(1).max(10000).required(),
    email: Joi.string()
      .pattern(
        new RegExp(
          "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+).([a-zA-Z]{2,5})$"
        )
      )
      .min(5)
      .max(1000)
      .required(),
    name: Joi.string().min(2).max(100).required(),
    designation: Joi.string()
      .valid(
        "intern",
        "consultant1",
        "consultant2",
        "associate1",
        "associate2",
        "manager"
      )
      .required(),
    role: Joi.string().valid("admin", "hr", "interviewer").required(),
  });
  return schema.validate(employee);
}

async function checkDuplicate(employeeId, email) {
  var isExistEmployeeId = await model.employee.getByCriteria({
    employeeId: employeeId,
  });
  var isExistEmail = await model.employee.getByCriteria({ email: email });

  if (isExistEmployeeId) throw new Error("Employee Id must be unique");
  if (isExistEmail) throw new Error("Email must be unique");

  return;
}

class Employee extends Base {
  constructor() {
    super(employeeModel);
  }

  async save(req, res) {
    try {
      const { error, value } = validateEmployee(req.body);
      if (error)
        return res.status(400).send({
          success: false,
          error: error.details[0].message,
        });

      req.body = value;
      req.body.employeeId = `CYG-${value.employeeId}`;

      await checkDuplicate(req.body.employeeId, req.body.email);

      super.save(req, res);
    } catch (e) {
      return res.status(500).send({
        success: false,
        payload: {
          message: e.message,
        },
      });
    }
  }

  async modify(req, res) {
    try {
      const { error, value } = validateEmployee(req.body);
      if (error)
        return res.status(400).send({
          success: false,
          error: error.details[0].message,
        });

      delete value["employeeId"];
      const storedData = await model.employee.get(req.params.id);
      if (!storedData) throw new Error("Employee to be updated doesn't exist");

      if (value.email !== storedData.email)
        await checkDuplicate(null, req.body.email);

      req.body = Object.assign(storedData, value);

      super.modify(req, res);
    } catch (e) {
      return res.status(500).send({
        success: false,
        payload: {
          message: e.message,
        },
      });
    }
  }
}

module.exports = new Employee();
