const { z } = require("zod");
const {
  requiredString,
  requiredPositiveInteger,
  requiredDate,
} = require("../helpers/zodSchemaHelper");

const createKunjunganSchema = z.object({
  pasien_id: requiredPositiveInteger("Pasien ID"),
  poli_id: requiredPositiveInteger("Poli ID"),
  tanggal_kunjungan: requiredDate("Tanggal Kunjungan"),
  no_registrasi: requiredString("No Registrasi", 4, 20),
  kode_registrasi: requiredString("Kode Registrasi", 4, 20),
  no_antrian: requiredPositiveInteger("No Antrian"),
});

const updateKunjunganSchema = createKunjunganSchema.partial();

module.exports = {
  createKunjunganSchema,
  updateKunjunganSchema,
};
