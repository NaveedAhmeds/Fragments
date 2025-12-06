const express = require('express');
const router = express.Router();

// Route: /fragments
router.get('/fragments', require('./api/get'));

// (Add more routes as needed...)

module.exports = router;
