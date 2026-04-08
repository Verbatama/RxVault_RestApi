const { z } = require('zod');
const { requiredString, requiredPositiveInteger } = require('../helpers/zodSchemaHelper');

const StokKeluarSchema = z.object({
  obat_id: z.number().int().positive().optional(),
  produk_obat_id: z.number().int().positive().optional(),
  ke_lokasi_id: z.number().int().positive().optional(),
  nomor_batch: requiredString('Nomor Batch'),
  jumlah_obat: requiredPositiveInteger('Jumlah Obat'),
  penerima: requiredString('Penerima'),
});

const StokKeluarByNoRegSchema = z.object({
  no_registrasi: requiredString('Nomor Registrasi', 1, 50),
  apoteker_id: requiredPositiveInteger('Apoteker ID'),
  items: z
    .array(
      z.object({
        detail_resep_id: requiredPositiveInteger('Detail Resep ID'),
        produk_obat_id: requiredPositiveInteger('Produk Obat ID'),
      }),
    )
    .optional(),
});

module.exports = { StokKeluarSchema, StokKeluarByNoRegSchema };
