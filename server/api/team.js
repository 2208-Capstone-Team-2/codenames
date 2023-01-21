const express = require('express');
const router = express.Router();
const { Team, Room } = require('../db');

// GET - /api/team/
// for testing routing
router.get('/', async (req, res, next) => {
  try {
    res.send('hi');
  } catch (err) {
    next(err);
  }
});

// GET - /api/team/makeTeamsForRoom/:roomId
// Given the roomId from the post body,
// Creates four teams models (aka the 4 card colors) & returns them
router.get('/makeTeamsForRoom/:roomId', async (req, res, next) => {
  try {
    console.log('inside makeTeamsForRoom!');

    // get roomId (that is our room model's id, not the firebase room name
    // from req body
    const { roomId } = req.params;
    console.log(`roomId: ${roomId}`);

    // Double check that this room exists in our db
    const room = await Room.findByPk(roomId);
    if (!room) return res.status(404).send('room with that id does not exist!');

    // Creates four teams models (aka the 4 card colors) & returns them
    // awaited individually in hopes that it forces team1 to have the id of 1
    const team1 = await Team.create({ name: 'team red', roomId });
    const team2 = await Team.create({ name: 'team blue', roomId });
    const team3 = await Team.create({ name: 'team white', roomId });
    const team4 = await Team.create({ name: 'team black', roomId });

    // Associate the room with the
    // An object that wraps the teams
    const teams = { team1, team2, team3, team4 };
    res.send(teams);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
