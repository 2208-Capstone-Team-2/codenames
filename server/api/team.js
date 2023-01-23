const express = require('express');
const router = express.Router();

// GET - /api/team/
// send back all teams
router.get('/', async (req, res, next) => {
  try {
    // not needed?
  } catch (err) {
    next(err);
  }
});

module.exports = router;
