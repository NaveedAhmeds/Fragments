const express = require('express');
const router = express.Router();
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();
const { getFragmentById } = require('../../services/fragmentService');

router.get('/fragments/:id.:ext', async (req, res) => {
  const { id, ext } = req.params;
  const fragment = await getFragmentById(req.user, id);

  if (!fragment) {
    return res.status(404).json({ error: 'Fragment not found' });
  }
  if (fragment.type === 'text/markdown' && ext === 'html') {
    const html = md.render(fragment.data);
    res.set('Content-Type', 'text/html');
    return res.status(200).send(html);
  }
  return res.status(415).json({ error: 'Conversion not supported yet' });
});

module.exports = router;
