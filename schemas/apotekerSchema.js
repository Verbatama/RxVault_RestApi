const { z } = require("zod");
const { requiredString, requiredPassword } = require("../helpers/zodSchemaHelper");

const createApotekerSchema = z.object({
  nama_apoteker: requiredString("Nama Apoteker"),
  password: requiredPassword("Password"),
});

const updateApotekerSchema = createApotekerSchema.partial();

const loginApotekerSchema = z.object({
  nama_apoteker: requiredString("Nama Apoteker"),
  password: requiredPassword("Password"),
});

module.exports = {
  createApotekerSchema,
  updateApotekerSchema,
  loginApotekerSchema,
};
