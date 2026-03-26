const { z } = require("zod");
const { requiredString } = require("../helpers/zodSchemaHelper");

const createBentukObatSchema = z.object({
  nama_bentuk_obat: requiredString("Nama Bentuk Obat", 3, 25),
});

const updateBentukObatSchema = createBentukObatSchema.partial();

module.exports = { createBentukObatSchema, updateBentukObatSchema };
