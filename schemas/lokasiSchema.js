const { z } = require("zod");
const { requiredString } = require("../helpers/zodSchemaHelper");

const createLokasiSchema = z.object({
  nama_lokasi: requiredString("Lokasi"),
});

const updateLokasiSchema = createLokasiSchema.partial();

module.exports = {
  createLokasiSchema,
  updateLokasiSchema,
};
