const { z } = require("zod");
const {
  requiredPositiveInteger,
  requiredString,
  requiredDate,
} = require("../helpers/zodSchemaHelper");

const createStokSchema = z.object({
  obat_id: requiredPositiveInteger("Obat"),
  nomor_batch: requiredString("Nomor Batch"),
  jumlah_obat: requiredPositiveInteger("Jumlah Obat"),
  expired_date: requiredDate("Expired Date"),
  
});

const createStokPerLokasiSchema = z.object({
  produk_obat_id: requiredPositiveInteger("Produk Obat"),
  nomor_batch: requiredString("Nomor Batch"),
  jumlah_obat: requiredPositiveInteger("Jumlah Obat"),
  expired_date: requiredDate("Expired Date"),
  lokasi_id: z.number().int().positive().optional(),
  lokasi_nama: z.string().min(1, "Lokasi wajib diisi").optional(),
});

const transferStokSchema = z.object({
  obat_id: requiredPositiveInteger("Obat"),
  golongan_obat_id: z.number().int().positive().optional(),
  jumlah_obat: requiredPositiveInteger("Jumlah Obat"),
  dari_lokasi_id: z.number().int().positive().optional(),
  ke_lokasi_id: z.number().int().positive().optional(),
  dari_lokasi_nama: z.string().min(1, "Nama lokasi asal tidak valid").optional(),
  ke_lokasi_nama: z.string().min(1, "Nama lokasi tujuan tidak valid").optional(),
});

const updateStokSchema = createStokSchema.partial();

module.exports = {
  createStokSchema,
  createStokPerLokasiSchema,
  transferStokSchema,
  updateStokSchema,
};
