const { z } = require("zod");
const {
  requiredString,
  requiredPositiveInteger,
  requiredEnum,
  requiredDate,
} = require("../helpers/zodSchemaHelper");

const createPasienSchema = z.object({
  nama_pasien: requiredString("Nama"),
  umur: requiredPositiveInteger("Umur"),
  jenis_kelamin: requiredEnum("Jenis Kelamin", ["Laki-laki", "Perempuan"]),

  alamat: requiredString("Alamat"),
  tanggal_lahir: requiredDate("Tanggal Lahir"),
  no_rekam_medis: requiredString("No Rekam Medis"),
});

const updatePasienSchema = createPasienSchema.partial();
module.exports = {
  createPasienSchema,
  updatePasienSchema,
};
