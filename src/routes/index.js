/**
 * Expose all of our API routes on /v1/* to include an API version.
 * Protect them all so you have to be authenticated in order to access.
 */
const express = require('express');
const router = express.Router();
const { authenticate } = require('../auth');

// Use the /v1 API routes, protected by authentication
router.use('/v1', authenticate(), require('./api'));

module.exports = router;