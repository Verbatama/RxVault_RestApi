const { z } = require("zod");
const { requiredString } = require("../helpers/zodSchemaHelper");

const createSpesialisSchema = z.object({
  nama_spesialis: requiredString("Nama Spesialis", 3, 25),
});

const updateSpesialisSchema = createSpesialisSchema.partial();
module.exports = {
  createSpesialisSchema,
  updateSpesialisSchema,
};
