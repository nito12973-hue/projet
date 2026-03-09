const express = require('express');

function createSecurityRouter(csrfProtection) {
  const router = express.Router();
  router.get('/csrf-token', csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
  });
  return router;
}

module.exports = createSecurityRouter;
