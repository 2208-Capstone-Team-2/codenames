const express = require('express');
const router = express.Router();
const { Team, Room } = require('../db');

// POST - /api/team/makeTeamsForRoom/
// Given the roomId from the post body,
// Creates four teams models (aka the 4 card colors) & returns them
router.post('/makeTeamsForRoom', async (req, res, next) => {
  try {
    console.log('inside makeTeamsForRoom!');

    // get roomId (that is our room model's id, not the firebase room name
    // from req body
    const { roomId } = req.body;
    const room = await Room.findByPk(roomId);

    // todo!
    // make four teams and give them room association
  } catch (err) {
    next(err);
  }
});

module.exports = router;
