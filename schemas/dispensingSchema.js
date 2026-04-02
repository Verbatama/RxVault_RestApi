const { z } = require("zod");
const {
  requiredPositiveInteger,
  requiredDate,
  requiredString
} = require("../helpers/zodSchemaHelper");

const createDispensingSchema = z.object({
  detail_resep_id: requiredPositiveInteger("Detail Resep ID"),
  apoteker_id: requiredPositiveInteger("Apoteker ID"),
  dispensingAt: requiredDate("Tanggal"),
  status_dispensing_id: requiredPositiveInteger("Status ID"),
});

const processDispensingByNoRegSchema = z.object({
  no_registrasi: requiredString("Nomor Registrasi", 1, 50),
  apoteker_id: requiredPositiveInteger("Apoteker ID"),
});

const updateDispensingSchema = createDispensingSchema.partial();

module.exports = {
  createDispensingSchema,
  processDispensingByNoRegSchema,
  updateDispensingSchema,
};
