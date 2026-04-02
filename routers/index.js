const express = require("express");
const router = express.Router();

router.use("/apoteker", require("./apotekerRouter"));
router.use("/admin", require("./adminRouter"));
router.use("/pasien", require("./pasienRouter"));
router.use("/resep", require("./resepRouter"));
router.use("/kunjungan", require("./kunjunganRouter"));
router.use("/dispensing", require("./dispensingRouter"));
router.use("/status-dispensing", require("./statusDispensingRouter"));
router.use("/obat", require("./obatRouter"));
router.use("/golongan-obat", require("./golonganObatRouter"));
router.use("/bentuk-obat", require("./bentukObatRouter"));  
router.use("/satuan-dosis", require("./satuanDosisRouter"));
router.use("/lokasi", require("./lokasiRouter"));
router.use("/supplier", require("./supplierRouter"));
router.use("/jenis-mutasi", require("./jenisMutasiRouter"));
router.use("/stok", require("./stokRouter"));
router.use('/penerimaan', require('./penerimaanRouter'));
router.use('/stok-keluar', require('./stokKeluarRouter'));
router.use('/stock-log', require('./stockLogRouter'));
router.use('/reports', require('./reportsRouter'));


module.exports = router;
