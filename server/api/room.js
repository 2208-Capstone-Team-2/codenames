const express = require('express');
const router = express.Router();
const { Room, Team } = require('../db');

// GET - /api/room/
// gets all the rooms and returns them
router.get('/', async (req, res, next) => {
  try {
    const rooms = await Room.findAll();
    res.send(rooms);
  } catch (err) {
    next(err);
  }
});

// GET - /api/room/create/
// Makes a new room and returns it
// Maybe change to POST if we want the firebase room name on the room
router.post('/create', async (req, res, next) => {
  try {
    const { roomName } = req.body;
    const room = await Room.create({ name: roomName });

    // Creates four teams models (aka the 4 card colors)
    const team1 = await Team.create({ name: 'team red', roomId: room.id });
    const team2 = await Team.create({ name: 'team blue', roomId: room.id });
    const team3 = await Team.create({ name: 'team white', roomId: room.id });
    const team4 = await Team.create({ name: 'team black', roomId: room.id });

    // Update the room object to have the ids of the teams we created
    // These are needed for creating the board layout, as:
    // team1 is team red, who will be the team that goes first, meaning they has 9 cards
    let updatedRoom = await room.update({
      team1id: team1.id,
      team2id: team2.id,
      team3id: team3.id,
      team4id: team4.id,
    });

    console.log(roomName);
    res.send(updatedRoom);
  } catch (err) {
    next(err);
  }
});

// /api/room/:roomId/
// this route is being used to send back team ids for individual rooms
router.get('/:roomId', async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findOne({ where: { name: roomId } });
    res.send(room);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
