const express = require('express');
const router = express.Router();
const { getSatuanDosis } = require('../controllers/satuanDosisController');

router.get('/', getSatuanDosis);

module.exports = router;