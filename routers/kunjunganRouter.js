const express = require("express");
const router = express.Router();
const {
  getKunjungan,
  getKunjunganById,
  createKunjungan,
  updateKunjungan,
} = require("../controllers/kunjunganController");
const validate = require("../helpers/validate");
const {
  createKunjunganSchema,
  updateKunjunganSchema,
} = require("../schemas/kunjunganSchema");

router.get("/", getKunjungan);
router.get("/:id", getKunjunganById);
router.post("/", validate(createKunjunganSchema), createKunjungan);
router.put("/:id", validate(updateKunjunganSchema), updateKunjungan);

module.exports = router;
