const { z } = require("zod");
const { requiredString } = require("../helpers/zodSchemaHelper");

const createJenisMutasiSchema = z.object({
  nama_jenis_mutasi: requiredString("Nama Status"),
});

const updateJenisMutasiSchema = createJenisMutasiSchema.partial();

module.exports = {
  createJenisMutasiSchema,
  updateJenisMutasiSchema,
};
