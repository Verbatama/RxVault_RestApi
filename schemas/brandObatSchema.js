const { z } = require("zod");
const { requiredString } = require("../helpers/zodSchemaHelper");

const createBrandObatSchema = z.object({
  nama_brand_obat: requiredString("Nama Brand Obat", 3, 50),
});

const updateBrandObatSchema = createBrandObatSchema.partial();

module.exports = { createBrandObatSchema, updateBrandObatSchema };
