const { z } = require("zod");
const {
  requiredString,
  requiredPositiveInteger,
  requiredDate,
} = require("../helpers/zodSchemaHelper");

const detailResepSchema = z.object({
  obat_id: requiredPositiveInteger("Obat"),
  jumlah: requiredPositiveInteger("Jumlah"),
  aturan_pakai: requiredString("Aturan Pakai"),
});

const createResepSchema = z.object({
  dokter_id: requiredPositiveInteger("Dokter"),
  pasien_id: requiredPositiveInteger("Pasien"),
  tanggal: requiredDate("Tanggal"),
  DetailReseps: z
    .array(detailResepSchema)
    .min(1, "Detail Resep tidak boleh kosong"),
});

const updateResepSchema = z
  .object({
    dokter_id: requiredPositiveInteger("Dokter"),
    tanggal: requiredDate("Tanggal"),
  })
  .partial();

module.exports = { createResepSchema, updateResepSchema };
