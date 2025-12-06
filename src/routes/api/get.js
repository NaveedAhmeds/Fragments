const express = require('express');
const router = express.Router();
const { getFragmentsForUser } = require('../../services/fragmentService');

router.get('/fragments', async (req, res) => {
  const expand = req.query.expand;
  try {
    let fragments = await getFragmentsForUser(req.user);
    if (expand === '1') {
      fragments = fragments.map((frag) => ({
        id: frag.id,
        owner: frag.owner,
        type: frag.type,
        created: frag.created,
        data: frag.data,
      }));
    } else {
      fragments = fragments.map((frag) => ({ id: frag.id }));
    }
    res.status(200).json({ fragments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
