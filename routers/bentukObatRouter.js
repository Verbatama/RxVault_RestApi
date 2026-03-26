const express = require("express");
const router = express.Router();
const {
  getBentukObat,
  getBentukObatById,
  createBentukObat,
  updateBentukObat,
} = require("../controllers/bentukObatController");
const validate = require("../helpers/validate");
const {
  createBentukObatSchema,
  updateBentukObatSchema,
} = require("../schemas/bentukObatSchema");

router.get("/", getBentukObat);
router.get("/:id", getBentukObatById);
router.post("/", validate(createBentukObatSchema), createBentukObat);
router.put("/:id", validate(updateBentukObatSchema), updateBentukObat);

module.exports = router;
