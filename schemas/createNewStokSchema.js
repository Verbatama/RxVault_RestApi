const {z} = require("zod");
const { requiredString, requiredPositiveInteger, requiredDate } = require("../helpers/zodSchemaHelper");

// Detail payload from the Vue form: nomor_batch, jumlah_obat, tanggal_kadaluarsa
const detailStok = z.object({
    nomor_batch: requiredString("Nomor Batch"),
    jumlah_obat: requiredPositiveInteger("Jumlah Obat"),
    tanggal_kadaluarsa: requiredDate("Tanggal Kadaluarsa"),
});

const ProdukObatStokSchema = z.object({
    obat_id: requiredPositiveInteger("Obat"),
    brand: requiredString("Brand"),
    bentuk_obat_id: requiredPositiveInteger("Bentuk Obat"),
    dosis: requiredPositiveInteger("Dosis"),
    satuan_dosis_id: requiredPositiveInteger("Satuan Dosis"),
        min_stok_gudang: z
            .number()
            .int()
            .positive("Minimum stok gudang harus lebih dari 0")
            .optional(),
    nama_supplier: requiredString("Nama Supplier"),
    alamat_supplier: requiredString("Alamat Supplier"),
    kontak_supplier: requiredString("Kontak Supplier"),
    DetailStoks: z.array(detailStok).min(1, "Detail Stok tidak boleh kosong"),
});

module.exports = { ProdukObatStokSchema };