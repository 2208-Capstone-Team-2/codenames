const express = require('express');
const router = express.Router();
const { Board } = require('../db');

// POST - /api/board/
// Given a roomId (via req.body), makes a new board for it
router.get('/', async (req, res, next) => {
  try {
    const { roomId } = req.body;
    // todo
  } catch (err) {
    next(err);
  }
});

module.exports = router;
