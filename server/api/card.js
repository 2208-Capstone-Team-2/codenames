const express = require('express');
const router = express.Router();
const { Word, Card, Board, Room } = require('../db');
const { getRandomIntArray, createRandomLayout } = require('./cardHelperFunctions');

// POST localhost:3000/api/card/make25/forRoom/:roomId
// Given the boardId of the board to fill,
// and array of workpack ids, creates 25 cards.
router.post('/make25/forRoom/:roomId', async (req, res, next) => {
  try {
    console.log('hitting make 25');

    // Get stuff out of req.body
    const { roomId } = req.params;
    const { selectedWordPackId } = req.body;

    console.log('inside post for make 25. roomId from params is: ', roomId);

    // Create a new board to put the 25 cards into
    const board = await Board.create();

    // Find which pack users select and put all the candidate words in an array
    const allWords = await Word.findAll({
      where: {
        //findAll can work with an array
        wordpackId: selectedWordPackId,
      },
    });

    if (!allWords) return res.sendStatus(404); // Sanity check

    // This is an array of random word ids to pull from
    const randomWordsIds = getRandomIntArray(25, allWords.length);

    // Get the teamIds that we will need to seed our cards
    // changed to findOneWhere because 'roomId' is a n
    const room = await Room.findOne({
      where: { name: roomId },
    });

    if (!room) return res.sendStatus(404); // Sanity check

    room.setBoard(board);

    const { team1id, team2id, team3id, team4id } = room;

    // If any of teamIds are falsey, immediately kick.
    if (!team1id || !team2id || !team3id || !team4id) res.sendStatus(404);

    const layout = createRandomLayout(team1id, team2id, team3id, team4id);

    const cards = [];
    //loop through the random index array
    for (let i = 0; i < 25; i++) {
      // Get a random teamId and wordId from our random arrays
      // layout: [33, 22, 22, 55, 54, 22, 33, 55 ....]
      const teamId = layout.pop();
      const wordId = randomWordsIds.pop();

      // make will become a Card, and push it
      const card = {
        boardId: board.id,
        wordId,
        teamId,
      };
      cards.push(card);
    }

    // sometimes breaks on these promises and can't accurate figure out why or when.
    const cardPromises = cards.map((card) => Card.create(card));
    await Promise.all(cardPromises);

    /****** At this point the cards have been seeded!
    We just need to: 
     - query so we can get the word ON to the card, from the Word Model association
     - make a copy of what we send back do that the field teamId is not on it (this is sensitive info)
    */

    const queriedCards = await Card.findAll({
      where: { boardId: board.id },
      include: [Word],
    });

    // remove the teamId property using delete keyword
    const cardsWithTeamIdDeleted = queriedCards.map((card) => {
      // Note: I tried using the delete keyword but it didn't work. So just assigning it to null.
      // delete card.teamId // didnt work....
      card.teamId = null;
      return card;
    });

    res.send(cardsWithTeamIdDeleted);
  } catch (err) {
    next(err);
  }
});
// get cards for spymaster
// needs to be validated with jwt?
router.get('/get25/forRoom/:roomId', async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findOne({
      where: { name: roomId },
    });

    const board = await Board.findOne({
      where: { roomId: room.id },
    });

    const cardsWithTeamIds = await Card.findAll({
      where: { boardId: board.id },
      include: [Word],
    });

    res.send(cardsWithTeamIds);
  } catch (err) {
    next(err);
  }
});

// PUT localhost:3000/api/card/make25/forRoom/:roomId
// Updates a card, given its cardID
// probably used for toggling isVisibleToAll
router.put('/:wordId', async (req, res, next) => {
  try {
    // TODO!!!!!!!
    const { wordId } = req.params;
    const { roomId } = req.body;

    const room = await Room.findOne({
      where: { name: roomId },
    });

    const board = await Board.findOne({
      where: { roomId: room.id },
    });

    const cardToUpdate = await Card.findOne({
      where: { id: wordId, boardId: board.id },
      include: [Word],
    });

    let cardRevealed = await cardToUpdate.update({ isVisibleToAll: true });

    res.send(cardRevealed);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
