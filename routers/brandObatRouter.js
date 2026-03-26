const express = require("express");
const router = express.Router();
const validate = require("../helpers/validate");
const {
  getBrandObat,
  getBrandObatById,
  createBrandObat,
  updateBrandObat,
} = require("../controllers/brandObatController");
const {
  createBrandObatSchema,
  updateBrandObatSchema,
} = require("../schemas/brandObatSchema");

router.get("/", getBrandObat);
router.get("/:id", getBrandObatById);
router.post("/", validate(createBrandObatSchema), createBrandObat);
router.put("/:id", validate(updateBrandObatSchema), updateBrandObat);

module.exports = router;
