const { z } = require("zod");
const { requiredString } = require("../helpers/zodSchemaHelper");

const createSupplierSchema = z.object({
  nama_supplier: requiredString("Nama supplier harus diisi"),
  kontak: requiredString("Kontak harus diisi"),
  alamat: requiredString("Alamat harus diisi"),
});

const updateSupplierSchema = createSupplierSchema.partial();

module.exports = { createSupplierSchema, updateSupplierSchema };
