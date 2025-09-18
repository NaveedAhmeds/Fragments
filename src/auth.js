const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const { CognitoJwtVerifier } = require('aws-jwt-verify');
const logger = require('./logger');

// Create the Cognito JWT verifier instance
const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: process.env.AWS_COGNITO_POOL_ID,
  clientId: process.env.AWS_COGNITO_CLIENT_ID,
  tokenUse: 'id', // Verify Identity Token
});

logger.info('Configured AWS Cognito JWT verifier');

// Cache JWKS keys on startup to speed up verification
jwtVerifier
  .hydrate()
  .then(() => logger.info('Cached Cognito JWKS keys'))
  .catch((err) => logger.error({ err }, 'Failed to cache JWKS keys'));

// Define Passport strategy using Bearer token and Cognito verifier
module.exports.strategy = () =>
  new BearerStrategy(async (token, done) => {
    try {
      // Verify the JWT token
      const user = await jwtVerifier.verify(token);
      logger.debug({ user }, 'Verified user token');
      // Pass user's email to the next middleware
      done(null, user.email);
    } catch (err) {
      logger.error({ err, token }, 'Token verification failed');
      done(null, false);
    }
  });

// Middleware to use Passport to authenticate bearer tokens
module.exports.authenticate = () =>
  passport.authenticate('bearer', { session: false });
