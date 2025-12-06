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
    res.status(201).location(`/fragments/${fragment.id}`).json({ fragment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
