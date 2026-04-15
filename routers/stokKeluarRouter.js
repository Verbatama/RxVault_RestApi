const express = require('express');
const router = express.Router();
const { createStokKeluar, processStokKeluarByNoReg } = require('../controllers/stokKeluarController');
const { StokKeluarSchema, StokKeluarByNoRegSchema } = require('../schemas/stokKeluarSchema');
const validate = require('../helpers/validate');
const {
  authenticateApoteker,
  injectApotekerIdFromSession,
} = require('../middlewares/apotekerAuthMiddleware');

router.post('/', validate(StokKeluarSchema), createStokKeluar);
router.post(
  '/by-no-reg',
  authenticateApoteker,
  injectApotekerIdFromSession,
  validate(StokKeluarByNoRegSchema),
  processStokKeluarByNoReg,
);

module.exports = router;
