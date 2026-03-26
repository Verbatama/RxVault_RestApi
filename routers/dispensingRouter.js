const express = require('express')
const router = express.Router()
const {createDispensingSchema, updateDispensingSchema} = require('../schemas/dispensingSchema')
const validate = require('../helpers/validate')
const {getDispensing, getDispensingById, createDispensing, updateDispensing} = require('../controllers/dispensingController')

router.get('/', getDispensing)
router.get('/:id', getDispensingById)
router.post('/', validate(createDispensingSchema) , createDispensing)
router.put('/:id', validate(updateDispensingSchema), updateDispensing)

module.exports = router
