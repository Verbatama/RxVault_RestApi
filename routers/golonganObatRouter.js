const express = require("express");
const router = express.Router();
const {
  getGolonganObat,
  getGolonganObatById,
  createGolonganObat,
  updateGolonganObat,
  softDeleteGolonganObat,
} = require("../controllers/golonganObatController");
const validate = require("../helpers/validate");
const {
  createGolonganObatSchema,
  updateGolonganObatSchema,
} = require("../schemas/golonganObatSchema");

router.get("/", getGolonganObat);
router.get("/:id", getGolonganObatById);
router.post("/", validate(createGolonganObatSchema), createGolonganObat);
router.put("/:id", validate(updateGolonganObatSchema), updateGolonganObat);
router.delete("/:id", softDeleteGolonganObat);

module.exports = router;
