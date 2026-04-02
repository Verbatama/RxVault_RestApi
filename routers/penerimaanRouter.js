const express = require('express');
const router = express.Router();
const { ProdukObatStokSchema } = require('../schemas/createNewStokSchema');
const validate = require('../helpers/validate');
const { createProdukObat } = require('../controllers/produkObatController');

router.post('/', validate(ProdukObatStokSchema), createProdukObat);

module.exports = router;
