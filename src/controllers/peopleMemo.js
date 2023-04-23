const PeopleMemo = require("../models/PeopleMemo");
const mongoose = require("mongoose");

const getAllPeopleMemos = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const peopleMemos = await PeopleMemo.find({ createdBy: user_id }).sort({
      createdAt: -1,
    });
    res.status(201).json({ peopleMemos });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createPeopleMemo = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;
    const peopleMemo = await PeopleMemo.create(req.body);
    res.status(201).json({ peopleMemo });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getPeopleMemo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "No such People memo" });
  const peopleMemo = await PeopleMemo.findById(id);
  if (!peopleMemo) return res.status(404).json({ error: "No such peopleMemo" });
  res.status(200).json(peopleMemo);
};

const deletePeopleMemo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "No such People memo" });
  const peopleMemo = await PeopleMemo.findOneAndDelete({ _id: id });
  if (!peopleMemo) return res.status(400).json({ error: "No such peopleMemo" });
  res.status(200).json(peopleMemo);
};

const updatePeopleMemo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "No such expenditure" });
  const peopleMemo = await PeopleMemo.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );
  if (!peopleMemo) return res.status(400).json({ error: "No such peopleMemo" });
  res.status(200).json(peopleMemo);
};

module.exports = {
  getAllPeopleMemos,
  createPeopleMemo,
  getPeopleMemo,
  deletePeopleMemo,
  updatePeopleMemo,
};
