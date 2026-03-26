const express = require('express')
const router = express.Router()
const validate = require('../helpers/validate')
const {createJenisMutasiSchema, updateJenisMutasiSchema} = require('../schemas/jenisMutasiSchema')
const {getJenisMutasi, getJenisMutasiById, createJenisMutasi, updateJenisMutasi} = require('../controllers/jenisMutasiController')

router.get('/', getJenisMutasi )
router.get('/:id', getJenisMutasiById)
router.post('/', validate(createJenisMutasiSchema), createJenisMutasi)
router.put('/:id', validate(updateJenisMutasiSchema), updateJenisMutasi)

module.exports = router
