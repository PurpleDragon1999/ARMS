const schema = require("../schemas");
const mongoose = require("mongoose");
const candidateSchema = new mongoose.Schema(schema.candidate, {
  versionKey: false,
});

candidateSchema.set("toObject", { getters: true });

class Candidate {
  constructor() {
    this.Model = mongoose.model("Candidate", candidateSchema);
  }

  async getAll(criteria = {}, columns = {}) {
    return this.Model.find(criteria, columns).sort({ name: 1 });
  }

  async get(criteria={}, columns={}) {
    let fields = "jdTitle jdId"
    return this.Model.findOne(criteria).populate('appliedFor', fields);
  }

  async modify(id, data) {
    return this.Model.findByIdAndUpdate(id, { $set: data }, { new: true });
  }

  async save(data) {
    return this.Model.create(data);
  }

  async remove(id) {
    return this.Model.deleteOne({ _id: id });
  }
}

module.exports = new Candidate();
