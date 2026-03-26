const { z } = require("zod");
const { requiredString } = require("../helpers/zodSchemaHelper");

const createPoliSchema = z.object({
  nama_poli: requiredString("Nama Poli"),
});

const updatePoliSchema = createPoliSchema.partial();

module.exports = { createPoliSchema, updatePoliSchema };
