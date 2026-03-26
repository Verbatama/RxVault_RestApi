const {z}= require('zod')
const { requiredPositiveInteger, requiredDate } = require('../helpers/zodSchemaHelper')

const createDispensingSchema = z.object({
  resep_id: requiredPositiveInteger("Resep ID"),
  apoteker_id: requiredPositiveInteger("Apoteker ID"),
  dispensingAt: requiredDate("Tanggal"),
  status_id:requiredPositiveInteger("Status ID"),
})

const updateDispensingSchema = createDispensingSchema.partial()


module.exports = {
  createDispensingSchema,
  updateDispensingSchema
}




