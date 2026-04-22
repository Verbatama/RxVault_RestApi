const express = require("express");
const router = express.Router();
const { ProdukObatStokSchema } = require("../schemas/createNewStokSchema");
const { createStokPerLokasiSchema, transferStokSchema } = require("../schemas/stokSchema");
const validate = require("../helpers/validate");
const { createProdukObat } = require("../controllers/produkObatController");
const {
	getJumlahStok,
	getRekapStokObat,
	getStokReminderGudang,
	createStokPerLokasi,
	transferStok,
} = require("../controllers/stokController");

router.get('/jumlah', getJumlahStok);
router.get('/rekap', getRekapStokObat);
router.get('/reminder', getStokReminderGudang);
router.post('/lokasi', validate(createStokPerLokasiSchema), createStokPerLokasi);
router.post('/transfer', validate(transferStokSchema), transferStok);
router.post('/', validate(ProdukObatStokSchema), createProdukObat);


module.exports = router;