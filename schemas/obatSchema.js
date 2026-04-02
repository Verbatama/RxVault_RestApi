const { z } = require("zod");
const {
  requiredString,
  requiredPositiveInteger,
} = require("../helpers/zodSchemaHelper");

const createObatSchema = z.object({
  nama_obat: requiredString("Nama Obat", 3, 25),
  golongan_obat_id: requiredPositiveInteger("Golongan Obat"),
});

const updateObatSchema = createObatSchema.partial();

module.exports = { createObatSchema, updateObatSchema };
