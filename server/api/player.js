const express = require('express');
// eslint-disable-next-line no-unused-vars
const router = express.Router();
// eslint-disable-next-line no-unused-vars
const { Player, Team, Room } = require('../db');

// POST --- once a player 'logins' we post their username, uid, and room to the db
router.post('/addToRoom', async (req, res, next) => {
  try {
    //1. Grab player username, uid, and room # off req.body
    const playerId = req.body.playerId;
    const playersUsername = req.body.username;
    const roomId = req.body.roomId;
    //2. Put player in db, associate their UID to the PK, and them to the room
    const newPlayer = await Player.create({
      id: playerId,
      username: playersUsername,
      roomId: roomId,
    });
    //3. res.send status and maybe some info
    res.send(newPlayer);
  } catch (error) {
    next(error);
  }
});
// PUT --- once a player has decided their team and role, we can add them here
router.put('/update/teamAndRole', async (req, res, next) => {
  try {
    //Grab players uid, roomId, team to join, and role off the req.body
    const playerId = req.body.playerId;
    const roomId = req.body.roomId;
    const teamToJoin = req.body.teamId;
    const roleToGivePlayer = req.body.role;
    //Query for that player
    const playerToUpdate = await Player.findOne({
      where: {
        id: playerId,
        roomId: roomId,
      },
    });
    //if we found the player, we update their team and role
    if (playerToUpdate) {
      await playerToUpdate.update({
        teamId: teamToJoin,
        role: roleToGivePlayer,
      });
    } else {
      console.log('player not found!');
    }
    res.send('player added to team and role!').status(201);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
