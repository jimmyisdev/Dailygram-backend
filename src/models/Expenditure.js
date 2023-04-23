const mongoose = require("mongoose");
const ExpenditureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide expenditure name"],
    },
    price: {
      type: Number,
      required: [true, "Please provide expenditure price"],
      default: 0,
    },
    description: {
      type: String,
      maxlength: [200, "Description can not be more than 200 characters"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expenditure", ExpenditureSchema);


