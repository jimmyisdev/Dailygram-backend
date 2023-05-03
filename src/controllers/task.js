const mongoose = require("mongoose");
const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  const queryObject = req.query;
  try {
    const user_id = req.user.userId;
    if (Object.keys(queryObject).length === 0) {
      const tasks = await Task.find({ createdBy: user_id }).sort({
        createdAt: -1,
      });
      res.status(200).json({ tasks });
    } else {
      const tasks = await Task.find({
        createdBy: user_id,
        ...queryObject,
      }).sort({
        createdAt: -1,
      });
      res.status(200).json({ tasks });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Task" });
  }
  const task = await Task.findById(id);
  if (!task) {
    return res.status(404).json({ error: "No such expenditure" });
  }
  res.status(200).json(task);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such task" });
  }
  const task = await Task.findOneAndDelete({ _id: id });
  if (!task) {
    return res.status(400).json({ error: "No such task" });
  }
  res.status(200).json(task);
};

const updateTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such task" });
  }
  const task = await Task.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );
  if (!task) {
    return res.status(400).json({ error: "No such task" });
  }
  res.status(200).json(task);
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask,
};
