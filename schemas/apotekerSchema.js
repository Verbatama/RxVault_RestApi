const { z } = require("zod");
const { requiredString } = require("../helpers/zodSchemaHelper");

const createApotekerSchema = z.object({
  nama_apoteker: requiredString("Nama Apoteker"),
});

const updateApotekerSchema = createApotekerSchema.partial();

module.exports = {
  createApotekerSchema,
  updateApotekerSchema,
};
