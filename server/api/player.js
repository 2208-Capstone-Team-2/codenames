const express = require('express');
// eslint-disable-next-line no-unused-vars
const router = express.Router();
// eslint-disable-next-line no-unused-vars
const { Player, Team, Room } = require('../db');
// GET --- get all players within a role on each team within a room
//✔ works
router.get('/allPlayers/:roomId/:teamId/:role', async (req, res, next) => {
  try {
    const roomId = req.params.roomId;
    const teamId = req.params.teamId;
    const roleToFind = req.params.role;
    console.log(roomId, teamId, roleToFind);
    const allPlayersInARoleOnATeam = await Player.findAll({
      where: {
        roomId: roomId,
        teamId: teamId,
        role: roleToFind,
      },
    });
    if (allPlayersInARoleOnATeam) {
      res.send(allPlayersInARoleOnATeam).status(201);
    } else {
      res.send('no players were found').status(404);
    }
  } catch (error) {
    next(error);
  }
});
// GET --- get all players on a particular team within a room
//✔ works
router.get('/allPlayers/:roomId/:teamId', async (req, res, next) => {
  try {
    const roomId = req.params.roomId;
    const teamId = req.params.teamId;
    const allPlayersOnATeam = await Player.findAll({
      where: {
        roomId: roomId,
        teamId: teamId,
      },
    });
    if (allPlayersOnATeam) {
      res.send(allPlayersOnATeam).status(201);
    } else {
      res.send('no players were found').status(404);
    }
  } catch (error) {
    next(error);
  }
});
// GET --- get all players in a room
//✔ works
router.get('/allPlayers/:roomId', async (req, res, next) => {
  try {
    const roomId = req.params.roomId;
    const allPlayersInARoom = await Player.findAll({
      where: {
        roomId: roomId,
      },
    });
    if (allPlayersInARoom) {
      res.send(allPlayersInARoom).status(201);
    } else {
      res.send('no players were found').status(404);
    }
  } catch (error) {
    next(error);
  }
});
//GET --- gets all players
//✔ works
router.get('/allPlayers', async (req, res, next) => {
  try {
    const allPlayers = await Player.findAll();
    if (allPlayers) {
      res.send(allPlayers).status(201);
    }
  } catch (error) {
    next(error);
  }
});
// POST --- once a player 'logins' we post their username, uid, and room to the db
//✔ works
router.post('/addPlayerToRoom', async (req, res, next) => {
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
//✔ works
router.put('/update/player/teamAndRole', async (req, res, next) => {
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
// PUT --- remove players role and team
// keeps players in the room but takes away their team and role
//✔ works
router.put('/remove/player/teamAndRole', async (req, res, next) => {
  const playerId = req.body.playerId;
  const roomId = req.body.roomId;
  try {
    const playerToRemoveFromTeam = await Player.findOne({
      where: {
        id: playerId,
        roomId: roomId,
      },
    });
    if (playerToRemoveFromTeam) {
      await playerToRemoveFromTeam.update({
        teamId: null,
        role: 'unassigned',
      });
    } else {
      console.log('player not found!');
    }
    res.send('player removed from team and role!').status(201);
  } catch (error) {
    next(error);
  }
});
// PUT --- remove player from room, their role and their team is also removed
// this route acts as a complete removal, it takes away their team and role as well
//✔ works
router.put('/remove/player/room', async (req, res, next) => {
  const playerId = req.body.playerId;
  const roomId = req.body.roomId;
  try {
    const playerToRemoveFromRoom = await Player.findOne({
      where: {
        id: playerId,
        roomId: roomId,
      },
    });
    if (playerToRemoveFromRoom) {
      await playerToRemoveFromRoom.update({
        teamId: null,
        roomId: null,
        role: 'unassigned',
      });
    } else {
      console.log('player not found!');
    }
    res.send('player removed from room').status(201);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
