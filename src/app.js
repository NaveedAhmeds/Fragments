const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const { author, version } = require('../package.json');
const logger = require('./logger');
const pino = require('pino-http')({ logger });

const routes = require('./routes');

const app = express();
const passport = require('passport');
const { authenticate, strategy } = require('./auth');

// Initialize Passport and use Cognito JWT strategy
passport.use(strategy());
app.use(passport.initialize());

app.use(pino); // Pino HTTP logging middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(compression()); // Gzip compression

app.use(express.json()); // Parse JSON request bodies

// Use modular routes
app.use('/', routes);

// 404 Middleware for unknown routes
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    error: { message: 'not found', code: 404 },
  });
});

// Error-handling Middleware (with 4 parameters to catch all errors)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'unable to process request';

  if (status >= 500) {
    logger.error({ err }, 'Server error');
  }

  res.status(status).json({
    status: 'error',
    error: { message, code: status },
  });
});

module.exports = app;
