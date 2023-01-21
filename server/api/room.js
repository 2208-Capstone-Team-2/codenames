const express = require('express');
const router = express.Router();
const { Room } = require('../db');

// GET - /api/room/create/
// Makes a new room and returns it
// Maybe change to POST if we want the firebase room name on the room
router.get('/create', async (req, res, next) => {
  try {
    const room = await Room.create({});

    res.send(room);
    // todo!
  } catch (err) {
    next(err);
  }
});

// /api/room/:roomId/

module.exports = router;
