const express = require('express');
const router = express.Router();
const { createFragment } = require('../../services/fragmentService');

router.post('/fragments', async (req, res) => {
  const contentType = req.headers['content-type'];
  const data = req.body;
  if (
    !contentType ||
    (!contentType.startsWith('text/') && contentType !== 'application/json')
  ) {
    return res.status(415).json({ error: 'Unsupported Content-Type' });
  }

  try {
    const fragment = await createFragment(req.user, contentType, data);
    // Use absolute URL for Location header
    const locationUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}/fragments/${fragment.id}`;
    res.status(201).location(locationUrl).json({ fragment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
