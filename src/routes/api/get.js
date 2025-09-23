/**
 * Get a list of fragments for the current user
 */
const {
  createSuccessResponse,
  createErrorResponse,
} = require('../../response');

module.exports = async (req, res) => {
  try {
    // Replace this with actual DB call
    const fragments = []; // await getFragmentsFromDb(req.user);

    res.status(200).json(createSuccessResponse({ fragments }));
  } catch (err) {
    res.status(500).json(createErrorResponse(500, 'Failed to fetch fragments'));
  }
};
