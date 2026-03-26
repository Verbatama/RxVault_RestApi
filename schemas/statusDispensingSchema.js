const { z } = require("zod");
const { requiredString } = require("../helpers/zodSchemaHelper");

const createStatusDispensingSchema = z.object({
  nama_status: requiredString("Status Dispensing"),
});

const updateStatusDispensingSchema = createStatusDispensingSchema.partial();

module.exports = {
  createStatusDispensingSchema,
  updateStatusDispensingSchema,
};
