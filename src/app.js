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
const { strategy } = require('./auth');

// Initialize Passport and use Cognito JWT strategy
passport.use(strategy());
app.use(passport.initialize());

app.use(pino); // Pino HTTP logging middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(compression()); // Gzip compression
app.use(express.json()); // Parse JSON request bodies

// Middleware to set Cache-Control header for all routes
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache');
  next();
});

// Health-check endpoint (for tests)
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    author,
    version,
    githubUrl: 'http://localhost:8080', // or replace with actual env var if needed
  });
});

// Simple /about endpoint
app.get('/about', (req, res) => {
  res.json({ author, version });
});

// Use modular routes
app.use('/', routes);

// 404 Middleware for unknown routes
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    error: { message: 'not found', code: 404 },
  });
});

// Error-handling Middleware
app.use((err, req, res) => {
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

// Add 404 middleware to handle any requests for resources that can't be found can't be found
app.use((req, res) => {
  // Pass along an error object to the error-handling middleware
  res.status(404).json({
    status: 'error',
    error: {
      message: 'not found',
      code: 404,
    },
  });
});

module.exports = app;
