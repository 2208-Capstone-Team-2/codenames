import express, { NextFunction, Request, Response, Router } from "express";
const router = Router();
import { Room, Team } from '../db';
import { randomWords } from 'random-words';

// const randomWords = require('random-words'); // used for room name generation

// GET - /api/room/
// gets all the rooms and returns them. Used for testing purposes
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rooms = await Room.findAll();
    res.send(rooms);
  } catch (err) {
    next(err);
  }
});

// GET - api/room/:roomId/
// this route is being used to send back team ids for individual rooms
router.get('/:roomId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { roomId } = req.params;
    console.log('looking for a room with name:', roomId);
    const room = await Room.findOne({ where: { name: roomId } });
    if (!room) res.sendStatus(404);
    else res.send(room);
  } catch (err) {
    next(err);
  }
});

// POST - /api/room/
// Creates a new room with a randomly generated word slug
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  // Note: Even though this is a 'POST' we don't actually have a req.body that is needed.
  // I merely stuck to calling it 'post' because this route creates a new room.
  try {
    let slug = randomWords({ exactly: 3, join: '-' }); // EG: happy-knight-work

    // the chance of this is VERY RARE, but make sure a room with this slug doesn't exist yet:
    let roomWithThisSlug = await Room.findOne({ where: { name: slug } });
    // If a room exists with this name,
    while (roomWithThisSlug) {
      slug = randomWords({ exactly: 3, join: '-' }); // Make another random slug
      roomWithThisSlug = await Room.findOne({ where: { name: slug } }); // See if there's a room that exists with this name again.
    }

    const room = await Room.create({ name: slug });

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

    res.send(updatedRoom);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
