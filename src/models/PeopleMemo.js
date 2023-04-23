const mongoose = require("mongoose");
const PeopleMemoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
    },
    organization: {
      type: String,
      default: "Unknown",
    },
    place: {
      type: String,
      default: "Unknown",
    },
    description: {
      type: String,
      maxlength: [300, "Description can not be more than 300 characters"],
      default: "Unknown",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PeopleMemo", PeopleMemoSchema);
