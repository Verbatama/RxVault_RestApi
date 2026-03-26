const express = require("express");
const router = express.Router();
const {
  getStatusDispensing,
  getStatusDispensingById,
  createStatusDispensing,
  updateStatusDispensing,
} = require("../controllers/statusDispensingController");
const {
  createStatusDispensingSchema,
  updateStatusDispensingSchema,
} = require("../schemas/statusDispensingSchema");
const validate = require("../helpers/validate");

router.get("/", getStatusDispensing);
router.get("/:id", getStatusDispensingById);
router.post(
  "/",
  validate(createStatusDispensingSchema),
  createStatusDispensing,
);
router.put(
  "/:id",
  validate(updateStatusDispensingSchema),
  updateStatusDispensing,
);

module.exports = router;
