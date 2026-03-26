const express = require("express");
const router = express.Router();
const validate = require("../helpers/validate");
const {
  getLokasi,
  getLokasiById,
  createLokasi,
  updateLokasi,
} = require("../controllers/lokasiController");
const {
  createLokasiSchema,
  updateLokasiSchema,
} = require("../schemas/lokasiSchema");

router.get("/", getLokasi);
router.get("/:id", getLokasiById);
router.post("/", validate(createLokasiSchema), createLokasi);
router.put("/:id", validate(updateLokasiSchema), updateLokasi);

module.exports = router;
