const express = require("express");
const router = express.Router();
const { createObatSchema, updateObatSchema } = require("../schemas/obatSchema");
const validate = require("../helpers/validate");
const {
  getObat,
  getObatById,
  getObatBySearch,
  createObat,
  updateObat,
} = require("../controllers/obatController");

router.get("/", getObat);
router.get("/search", getObatBySearch);
router.get("/:id", getObatById);
router.post("/", validate(createObatSchema), createObat);
router.put("/:id", validate(updateObatSchema), updateObat);
module.exports = router;
