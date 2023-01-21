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
    const team1 = await Team.create({ name: 'team red', roomId });
    const team2 = await Team.create({ name: 'team blue', roomId });
    const team3 = await Team.create({ name: 'team white', roomId });
    const team4 = await Team.create({ name: 'team black', roomId });

    // Update the room object to have the ids of the teams we created
    room.update({
      team1id: team1.id,
      team2id: team2.id,
      team3id: team3.id,
      team4id: team4.id,
    });
    // Send back an object that wraps the teams
    // const teams = { team1, team2, team3, team4 };
    res.send(room);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
