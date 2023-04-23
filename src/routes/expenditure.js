const express = require("express");
const {
  getAllExpenditures,
  getExpenditure,
  createExpenditure,
  deleteExpenditure,
  updateExpenditure,
} = require("../controllers/expenditure");
const router = express.Router();

router.route("/").get(getAllExpenditures).post(createExpenditure);
router
  .route("/:id")
  .get(getExpenditure)
  .delete(deleteExpenditure)
  .put(updateExpenditure);

module.exports = router;
