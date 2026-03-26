const express = require("express");
const router = express.Router();
const {
  getRole,
  getRoleById,
  createRole,
  updateRole,
  getUser,
  getUserById,
  createUser,
  updateUser,
  getSpesialis,
  getSpesialisById,
  createSpesialis,
  updateSpesialis,
  getPoli,
  getPoliById,
  createPoli,
  updatePoli,
  getDokter,
  getDokterById,
  createDokter,
  updateDokter,
} = require("../controllers/adminController");
const validate = require("../helpers/validate");
const { createRoleSchema, updateRoleSchema } = require("../schemas/roleSchema");
const { createUserSchema, updateUserSchema } = require("../schemas/userSchema");
const {
  createSpesialisSchema,
  updateSpesialisSchema,
} = require("../schemas/spesialisSchema");
const { createPoliSchema, updatePoliSchema } = require("../schemas/poliSchema");
const {
  createDokterSchema,
  updateDokterSchema,
} = require("../schemas/dokterSchema");

router.get("/role", getRole);
router.get("/role/:id", getRoleById);
router.post("/role", validate(createRoleSchema), createRole);
router.put("/role/:id", validate(updateRoleSchema), updateRole);

router.get("/user", getUser);
router.get("/user/:id", getUserById);
router.post("/user", validate(createUserSchema), createUser);
router.put("/user/:id", validate(updateUserSchema), updateUser);

router.get("/spesialis", getSpesialis);
router.get("/spesialis/:id", getSpesialisById);
router.post("/spesialis", validate(createSpesialisSchema), createSpesialis);
router.put("/spesialis/:id", validate(updateSpesialisSchema), updateSpesialis);

router.get("/poli", getPoli);
router.get("/poli/:id", getPoliById);
router.post("/poli", validate(createPoliSchema), createPoli);
router.put("/poli/:id", validate(updatePoliSchema), updatePoli);

router.get("/dokter", getDokter);
router.get("/dokter/:id", getDokterById);
router.post("/dokter", validate(createDokterSchema), createDokter);
router.put("/dokter/:id", validate(updateDokterSchema), updateDokter);

module.exports = router;
