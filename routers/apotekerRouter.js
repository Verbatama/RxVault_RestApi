const express = require("express");
const router = express.Router();
const {
  createApotekerSchema,
  updateApotekerSchema,
} = require("../schemas/apotekerSchema");
const {
  getApoteker,
  getApotekerById,
  createApoteker,
  updateApoteker,
} = require("../controllers/apotekerController");
const validate = require("../helpers/validate");

router.get("/", getApoteker);
router.get("/:id", getApotekerById);
router.post("/", validate(createApotekerSchema), createApoteker);
router.put("/:id", validate(updateApotekerSchema), updateApoteker);

module.exports = router;
