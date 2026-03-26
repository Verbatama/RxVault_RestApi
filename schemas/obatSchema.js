const { z } = require("zod");
const {
  requiredString,
  requiredPositiveInteger,
} = require("../helpers/zodSchemaHelper");

const createObatSchema = z.object({
  nama_obat: requiredString("Nama Obat", 3, 25),
  dosis: requiredPositiveInteger("Dosis"),
  satuan_dosis: requiredString("Satuan Dosis"),
  bentuk_obat_id: requiredPositiveInteger("Bentuk Obat"),
  golongan_obat_id: requiredPositiveInteger("Golongan Obat"),
  kode_obat: requiredString("Kode Obat", 3, 16),
  brand_obat_id: requiredPositiveInteger("Brand Obat"),
  bpom: requiredString("BPOM", 3, 16),
});

const updateObatSchema = createObatSchema.partial();

module.exports = { createObatSchema, updateObatSchema };
