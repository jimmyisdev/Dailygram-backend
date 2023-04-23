const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide task name"],
    },
    description: {
      type: String,
      required: [true, "Please provide task price"],
      default: "Unknown",
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    level: {
      type: String,
      enum: ["unnecessary", "normal", "emergent"],
      default: "normal",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
