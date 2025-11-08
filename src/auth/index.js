// src/auth/index.js

// Check for mutually exclusive configurations
if (
  process.env.AWS_COGNITO_POOL_ID &&
  process.env.AWS_COGNITO_CLIENT_ID &&
  process.env.HTPASSWD_FILE
) {
  throw new Error(
    'env contains configuration for both AWS Cognito and HTTP Basic Auth. Only one is allowed.'
  );
}

// Prefer Amazon Cognito (production or development)
if (process.env.AWS_COGNITO_POOL_ID && process.env.AWS_COGNITO_CLIENT_ID) {
  // If both Cognito variables are present, use Cognito strategy
  module.exports = require('./cognito');
}
// Allow .htpasswd file for development only
else if (
  process.env.HTPASSWD_FILE &&
  (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production')
) {
  // If .htpasswd is present and NOT in production, use basic auth
  module.exports = require('./basic-auth');
}
// In all other cases, stop and instruct user to fix config
else {
  throw new Error('missing env vars: no authorization configuration found');
}