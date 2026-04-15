const express = require("express");
const router = express.Router();
const {
  createDispensingSchema,
  processDispensingByNoRegSchema,
  updateDispensingSchema,
} = require("../schemas/dispensingSchema");
const validate = require("../helpers/validate");
const {
  authenticateApoteker,
  injectApotekerIdFromSession,
} = require("../middlewares/apotekerAuthMiddleware");
const {
  getDispensing,
  getDispensingById,
  createDispensing,
  updateDispensing,
  getDispensingByNoReg,
  processDispensingByNoReg,
  getDispensingQueue,
} = require("../controllers/dispensingController");

router.get("/", getDispensing);
router.get("/queue", authenticateApoteker, getDispensingQueue);
router.get("/by-no-reg/:no_registrasi", authenticateApoteker, getDispensingByNoReg);
router.get("/:id", getDispensingById);
router.post("/", validate(createDispensingSchema), createDispensing);
router.post(
  "/process-by-no-reg",
  authenticateApoteker,
  injectApotekerIdFromSession,
  validate(processDispensingByNoRegSchema),
  processDispensingByNoReg,
);
router.put("/:id", validate(updateDispensingSchema), updateDispensing);

module.exports = router;
