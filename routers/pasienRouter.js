const express = require("express");
const router = express.Router();

const {
  getPasien,
  getPasienById,
  createPasien,
  updatePasien,
  getPasienByNoReg,
} = require("../controllers/pasienController");
const validate = require("../helpers/validate");
const {
  updatePasienSchema,
  createPasienSchema,
} = require("../schemas/pasienSchema");

router.get("/", getPasien);
router.get("/no_reg/:no_registrasi", getPasienByNoReg);
router.get("/:id", getPasienById);
router.post("/", validate(createPasienSchema), createPasien);
router.put("/:id", validate(updatePasienSchema), updatePasien);

module.exports = router;
