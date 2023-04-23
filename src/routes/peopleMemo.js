const express = require("express");
const {
  getAllPeopleMemos,
  getPeopleMemo,
  createPeopleMemo,
  deletePeopleMemo,
  updatePeopleMemo,
} = require("../controllers/peopleMemo");
const router = express.Router();

router.route("/").get(getAllPeopleMemos).post(createPeopleMemo);
router
  .route("/:id")
  .get(getPeopleMemo)
  .delete(deletePeopleMemo)
  .put(updatePeopleMemo);

module.exports = router;
