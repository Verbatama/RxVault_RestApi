const { z } = require("zod");
const {
  requiredString,
  requiredPositiveInteger,
} = require("../helpers/zodSchemaHelper");

const createDokterSchema = z.object({
  nama_dokter: requiredString("Nama Dokter", 3, 50),
  sip: requiredString("SIP"),
  spesialis_id: requiredPositiveInteger("ID Spesialis").nullable(),
});

const updateDokterSchema = createDokterSchema.partial();

module.exports = { createDokterSchema, updateDokterSchema };
