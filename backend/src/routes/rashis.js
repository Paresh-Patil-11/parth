// routes/rashis.js
const express = require('express');
const router = express.Router();
const { getRashis } = require('../controllers/rashiController');

router.get('/', getRashis);

module.exports = router;