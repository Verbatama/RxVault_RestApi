const express = require("express");
const router = express.Router();
const {
  createApotekerSchema,
  updateApotekerSchema,
  loginApotekerSchema,
} = require("../schemas/apotekerSchema");
const {
  getApoteker,
  getApotekerById,
  createApoteker,
  updateApoteker,
  loginApoteker,
  getCurrentApoteker,
} = require("../controllers/apotekerController");
const validate = require("../helpers/validate");
const { authenticateApoteker } = require("../middlewares/apotekerAuthMiddleware");

router.post("/login", validate(loginApotekerSchema), loginApoteker);
router.get("/me", authenticateApoteker, getCurrentApoteker);
router.get("/", getApoteker);
router.get("/:id", getApotekerById);
router.post("/", validate(createApotekerSchema), createApoteker);
router.put("/:id", validate(updateApotekerSchema), updateApoteker);

module.exports = router;
