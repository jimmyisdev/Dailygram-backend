const express = require("express");
const {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/task");
const router = express.Router();

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).delete(deleteTask).put(updateTask);

module.exports = router;
