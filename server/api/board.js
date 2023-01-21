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
