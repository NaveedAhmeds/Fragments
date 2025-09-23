/**
 * Get a list of fragments for the current user
 */
const {
  createSuccessResponse,
  createErrorResponse,
} = require('../../response');

module.exports = async (req, res) => {
  try {
    const fragments = []; // Replace with actual DB call: await getFragmentsFromDb(req.user);
    res.status(200).json(createSuccessResponse({ fragments }));
  } catch {
    res.status(500).json(createErrorResponse(500, 'Failed to fetch fragments'));
  }
};
