const express = require('express');
const router = express.Router();
const { getFragmentById } = require('../../services/fragmentService');

router.get('/fragments/:id', async (req, res) => {
  const fragment = await getFragmentById(req.user, req.params.id);
  if (!fragment) {
    return res.status(404).json({ error: 'Fragment not found' });
  }
  res.set('Content-Type', fragment.type);
  res.status(200).send(fragment.data);
});

router.get('/fragments/:id/info', async (req, res) => {
  const fragment = await getFragmentById(req.user, req.params.id);
  if (!fragment) {
    return res.status(404).json({ error: 'Fragment not found' });
  }
  const { id, owner, type, created } = fragment;
  res.status(200).json({ id, owner, type, created });
});

module.exports = router;
