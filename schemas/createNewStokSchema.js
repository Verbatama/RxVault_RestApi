const {z} = require("zod");
const { requiredString, requiredPositiveInteger } = require("../helpers/zodSchemaHelper");

// Detail payload from the Vue form: nomor_batch, jumlah_obat, tanggal_kadaluarsa
const detailStok = z.object({
    nomor_batch: requiredString("Nomor Batch"),
    jumlah_obat: requiredPositiveInteger("Jumlah Obat"),
    tanggal_kadaluarsa: requiredString("Tanggal Kadaluarsa"),
});

const ProdukObatStokSchema = z.object({
    obat_id: requiredPositiveInteger("Obat"),
    brand: requiredString("Brand"),
    bentuk_obat_id: requiredPositiveInteger("Bentuk Obat"),
    dosis: requiredPositiveInteger("Dosis"),
    satuan_dosis_id: requiredPositiveInteger("Satuan Dosis"),
    nama_supplier: requiredString("Nama Supplier"),
    alamat_supplier: requiredString("Alamat Supplier"),
    kontak_supplier: requiredString("Kontak Supplier"),
    DetailStoks: z.array(detailStok).min(1, "Detail Stok tidak boleh kosong"),
});

module.exports = { ProdukObatStokSchema };