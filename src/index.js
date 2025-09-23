const express = require('express');
const router = express.Router();

router.get('/fragments', require('./routes/api/get'));

module.exports = router;
