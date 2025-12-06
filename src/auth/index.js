// src/auth/index.js

// Provide a mock Passport strategy in test mode
if (process.env.NODE_ENV === 'test') {
  const { Strategy: PassportStrategy } = require('passport-strategy');
  class MockTestStrategy extends PassportStrategy {
    constructor() {
      super();
      this.name = 'mock';
    }
    authenticate(req) {
      // Always succeed in test
      req.user = 'testuser';
      this.success(req.user);
    }
  }
  module.exports = {
    authenticate: () => (req, res, next) => {
      req.user = 'testuser';
      next();
    },
    strategy: () => new MockTestStrategy(),
  };
} else {
  // ... (rest of your production config unchanged)
  if (
    process.env.AWS_COGNITO_POOL_ID &&
    process.env.AWS_COGNITO_CLIENT_ID &&
    process.env.HTPASSWD_FILE
  ) {
    throw new Error(
      'env contains configuration for both AWS Cognito and HTTP Basic Auth. Only one is allowed.'
    );
  }

  if (process.env.AWS_COGNITO_POOL_ID && process.env.AWS_COGNITO_CLIENT_ID) {
    module.exports = require('./cognito');
  } else if (
    process.env.HTPASSWD_FILE &&
    (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production')
  ) {
    module.exports = require('./basic-auth');
  } else {
    throw new Error('missing env vars: no authorization configuration found');
  }
}
