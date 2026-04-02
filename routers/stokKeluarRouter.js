const express = require('express');
const router = express.Router();
const { createStokKeluar, processStokKeluarByNoReg } = require('../controllers/stokKeluarController');
const { StokKeluarSchema, StokKeluarByNoRegSchema } = require('../schemas/stokKeluarSchema');
const validate = require('../helpers/validate');

router.post('/', validate(StokKeluarSchema), createStokKeluar);
router.post('/by-no-reg', validate(StokKeluarByNoRegSchema), processStokKeluarByNoReg);

module.exports = router;
