const express = require("express");
const router = express.Router();
const {
  getSupplier,
  getSupplierById,
  createSupplier,
  updateSupplier,
} = require("../controllers/supplierController");
const {
  createSupplierSchema,
  updateSupplierSchema,
} = require("../schemas/supplierSchema");
const validate = require("../helpers/validate");

router.get("/", getSupplier);
router.get("/:id", getSupplierById);
router.post("/", validate(createSupplierSchema), createSupplier);
router.put("/:id", validate(updateSupplierSchema), updateSupplier);

module.exports = router;
