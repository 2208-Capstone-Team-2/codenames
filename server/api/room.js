const express = require('express');
const router = express.Router();
const { Room } = require('../db');

// GET - /api/room/makeRoom/
// Makes a new room and returns it
// Maybe change to POST if we want the firebase room name on the room
router.post('/makeRoom', async (req, res, next) => {
  try {
    console.log('inside makeRoom!');
    // todo!
    // make a new room and return it
  } catch (err) {
    next(err);
  }
});

module.exports = router;
