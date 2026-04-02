const express = require('express');
const router = express.Router();
const { getStockLog } = require('../controllers/stockLogController');

router.get('/', getStockLog);

module.exports = router;
