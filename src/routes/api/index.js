const express = require('express');
const router = express.Router();

// Import individual route handlers
const getFragments = require('./get');

// Define GET /v1/get
router.get('/get', getFragments);

module.exports = router;