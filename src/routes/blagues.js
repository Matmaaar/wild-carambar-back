const express = require('express');
const router = express.Router();

router.get('/', (_req, res) => {
  res.json({ ok: true, message: 'Routes blagues opérationnelles' });
});

module.exports = router;
