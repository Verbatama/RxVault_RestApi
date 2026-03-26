const express = require("express");
const router = express.Router();
const {
  getResep,
  getResepById,
  createResep,
  updateResep,
} = require("../controllers/resepController");
const {
  createResepSchema,
  updateResepSchema,
} = require("../schemas/resepSchema");
const validate = require("../helpers/validate");

router.get("/", getResep);
router.get("/:id", getResepById);
router.post("/", validate(createResepSchema), createResep);
router.put("/:id", validate(updateResepSchema), updateResep);

module.exports = router;
