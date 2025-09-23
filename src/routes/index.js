const express = require('express');
const router = express.Router();
const { authenticate } = require('../auth');

//failing eslint on purpose...
const unneededVariable = 'This variable is never used';

router.use('/v1', authenticate(), require('./api'));

router.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

module.exports = router;
