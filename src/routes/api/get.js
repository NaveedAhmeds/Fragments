// src/routes/api/get.js

const express = require('express');
const router = express.Router();

const logger = require('../../logger');
const {
  createSuccessResponse,
  createErrorResponse,
} = require('../../response');
const data = require('../../model/data');

// GET /v1/fragments
// - ?expand=1 -> full metadata + data
// - no expand -> ids only
router.get('/fragments', async (req, res) => {
  try {
    const expand = req.query.expand === '1';
    logger.debug(`Get all fragments for user ${req.user}, expand=${expand}`);

    const fragments = await data.listFragments(req.user, expand);

    res.status(200).json(createSuccessResponse({ fragments }));
  } catch (err) {
    logger.error(`Failed to get fragments for user ${req.user}: ${err}`);
    res.status(500).json(createErrorResponse(500, 'Internal Server Error'));
  }
});

module.exports = router;
