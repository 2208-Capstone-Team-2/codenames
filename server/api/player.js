const express = require('express');
// eslint-disable-next-line no-unused-vars
const router = express.Router();
// eslint-disable-next-line no-unused-vars
const { Player, Team, Room } = require('../db');

// POST --- once a player 'logins' we post their username, uid, and room to the db
router.post('/addToRoom', async (req, res, next) => {
  try {
    //1. Grab player username, uid, and room # off req.body
    //2. Put player in db, associate their UID to the PK, and them to the room
    //3. res.send status and maybe some info
  } catch (error) {
    next(error);
  }
});

module.exports = router;
