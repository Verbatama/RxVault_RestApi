const { z } = require("zod");
const {
  requiredPositiveInteger,
  requiredString,
  requiredDate,
} = require("../helpers/zodSchemaHelper");

const createMutasiStokSchema = z.object({
  obat_id: requiredPositiveInteger("Obat"),
  dari_lokasi_id: requiredPositiveInteger("Dari Lokasi"),
  ke_lokasi_id: requiredPositiveInteger("Ke Lokasi"),
  jumlah_obat: requiredPositiveInteger("Jumlah Obat"),
  nomor_batch: requiredString("Nomor Batch"),
  tanggal_mutasi: requiredDate("Tanggal Mutasi"),
  jenis_mutasi_id: requiredPositiveInteger("Jenis Mutasi"),
  supplier_id: requiredPositiveInteger("Supplier").optional(),
}).refine((data) => data.dari_lokasi_id !== data.ke_lokasi_id, {
  message: "Lokasi asal dan tujuan tidak boleh sama",
  path: ["ke_lokasi_id"]
 });

const updateMutasiStokSchema = createMutasiStokSchema.partial();

module.exports = {
  createMutasiStokSchema,
  updateMutasiStokSchema,
};
