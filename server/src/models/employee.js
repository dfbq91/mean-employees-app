const mongoose = require("mongoose");
const { Schema } = mongoose;

const employeeSchema = new Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    office: { type: String, required: true },
    salary: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true, // When a document is created, --v field is not added
  }
);

module.exports = mongoose.model("Employee", employeeSchema);