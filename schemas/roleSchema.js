const { z } = require("zod");
const { requiredString } = require("../helpers/zodSchemaHelper");

const createRoleSchema = z.object({
  nama_role: requiredString("Nama Role", 3, 50),
});

const updateRoleSchema = createRoleSchema.partial();

module.exports = { createRoleSchema, updateRoleSchema };
