const { z } = require("zod");
const { requiredString } = require("../helpers/zodSchemaHelper");

const createGolonganObatSchema = z.object({
  nama_golongan_obat: requiredString("Nama Golongan Obat", 3, 20),
});
const updateGolonganObatSchema = createGolonganObatSchema.partial();

module.exports = { createGolonganObatSchema, updateGolonganObatSchema };
