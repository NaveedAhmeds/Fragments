// src/server.js

require('dotenv').config(); // MUST be first, before any other require!

console.log(
  'DEBUG: POOL_ID:',
  process.env.AWS_COGNITO_POOL_ID,
  'CLIENT_ID:',
  process.env.AWS_COGNITO_CLIENT_ID
);

const stoppable = require('stoppable');
const logger = require('./logger');
const app = require('./app');

const port = parseInt(process.env.PORT || '8080', 10);

const server = stoppable(
  app.listen(port, () => {
    logger.info(`Server started on port ${port}`);
  })
);

module.exports = server;