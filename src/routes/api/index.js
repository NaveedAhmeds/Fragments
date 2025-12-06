const express = require('express');
const router = express.Router();

const getFragmentsRoute = require('./get');
const postFragmentsRoute = require('./post');
const convertRoute = require('./convert');
const byIdRoute = require('./byId');

router.use('/', getFragmentsRoute);
router.use('/', postFragmentsRoute);
router.use('/', convertRoute); // must be before byId
router.use('/', byIdRoute);

module.exports = router;
