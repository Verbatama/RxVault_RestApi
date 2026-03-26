const { z } = require("zod");
const {
  requiredString,
  requiredPassword,
  requiredPositiveInteger,
} = require("../helpers/zodSchemaHelper");

const createUserSchema = z.object({
  nama: requiredString("Nama"),
  role_id: requiredPositiveInteger("Role ID"),
  email: requiredString("Email").email("Email tidak valid"),
  password: requiredPassword("Password"),
  sipa: requiredString("SIPA").nullable(),
  stra: requiredString("STRA").nullable(),
});
const updateUserSchema = createUserSchema.partial();
module.exports = {
  createUserSchema,
  updateUserSchema,
};
