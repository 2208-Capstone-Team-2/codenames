const express = require('express');
const router = express.Router();
const { Board } = require('../db');

// DELETE - /api/board/:boardId
// Given a boardId (via req.body),
// deletes all the cards associated with it & then deletes the board itself
router.get('/:boardId', async (req, res, next) => {
  try {
    const { boardId } = req.params;
    // todo
  } catch (err) {
    next(err);
  }
});

module.exports = router;
