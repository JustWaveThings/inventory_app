const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiameterSchema = new Schema({
  size: {
    type: Number,
    required: true,
    default: 1.75,
  },
});

// virtual for diameter url

DiameterSchema.virtual("name").get(function () {
  return `${this.size}mm`;
});

DiameterSchema.virtual("url").get(function () {
  return `/catalog/diameter/${this._id}`;
});

module.exports = mongoose.model("Diameter", DiameterSchema);
