const { z } = require("zod");
const {
  requiredPositiveInteger,
  requiredString,
  requiredDate,
} = require("../helpers/zodSchemaHelper");

const createStokSchema = z.object({
  obat_id: requiredPositiveInteger("Obat"),
  nomor_batch: requiredString("Nomor Batch"),
  jumlah_obat: requiredPositiveInteger("Jumlah Obat"),
  expired_date: requiredDate("Expired Date"),
  lokasi_id: requiredPositiveInteger("Lokasi"),
});

const updateStokSchema = createStokSchema.partial();

module.exports = {
  createStokSchema,
  updateStokSchema,
};
