const Expenditure = require("../models/Expenditure");
const mongoose = require("mongoose");

const getAllExpenditures = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const expenditures = await Expenditure.find({ createdBy: user_id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ expenditures });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createExpenditure = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;
    const expenditure = await Expenditure.create(req.body);
    res.status(200).json({ expenditure });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getExpenditure = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "No such Expenditure" });
  const expenditure = await Expenditure.findById(id);
  if (!expenditure)
    return res.status(404).json({ error: "No such expenditure" });
  res.status(200).json(expenditure);
};

const deleteExpenditure = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "No such Expenditure" });
  const expenditure = await Expenditure.findOneAndDelete({ _id: id });
  if (!expenditure)
    return res.status(400).json({ error: "No such expenditure" });
  res.status(200).json(expenditure);
};

const updateExpenditure = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "No such expenditure" });
  const expenditure = await Expenditure.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );
  if (!expenditure) {
    return res.status(400).json({ error: "No such expenditure" });
  }
  res.status(200).json(expenditure);
};

module.exports = {
  getAllExpenditures,
  createExpenditure,
  getExpenditure,
  deleteExpenditure,
  updateExpenditure,
};
