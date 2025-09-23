const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const { author, version } = require('../package.json');
const logger = require('./logger');
const pino = require('pino-http')({ logger });

const routes = require('./routes');
const passport = require('passport');
const { strategy } = require('./auth');
const { createSuccessResponse, createErrorResponse } = require('./response');

const app = express();

// Initialize Passport and use JWT strategy
passport.use(strategy());
app.use(passport.initialize());

// Middleware
app.use(pino);
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());

// Cache-Control header
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache');
  next();
});

// Health-check endpoint
app.get('/', (req, res) => {
  res.json(
    createSuccessResponse({
      author,
      version,
      githubUrl: 'http://localhost:8080', // replace with env var if needed
    })
  );
});

// About endpoint
app.get('/about', (req, res) => {
  res.json(createSuccessResponse({ author, version }));
});

// Use modular routes
app.use('/', routes);

// 404 Middleware for unknown routes
app.use((req, res) => {
  res.status(404).json(createErrorResponse(404, 'not found'));
});

// Error-handling Middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'unable to process request';

  if (status >= 500) {
    logger.error({ err }, 'Server error');
  }

  res.status(status).json(createErrorResponse(status, message));
});

module.exports = app;
