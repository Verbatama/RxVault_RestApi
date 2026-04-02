const express = require('express');
const router = express.Router();
const { getDailyUsage } = require('../controllers/reportsController');

router.get('/daily', getDailyUsage);

module.exports = router;
