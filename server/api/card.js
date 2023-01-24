const express = require('express');
const router = express.Router();
const { Word, Card, Board, Room } = require('../db');

//a function to get "quantity" of unique random interger, from 0 - max (inclusive)
function getRandomIntArray(quantity, max) {
  const arr = [];
  while (arr.length < quantity) {
    let candidateInt = Math.floor(Math.random() * (max + 1));
    if (arr.indexOf(candidateInt) === -1) arr.push(candidateInt);
  }
  return arr;
}

// Creates an array of 25 elements that are teamIds.
// team1's id appears 9 times
// team2's id appears 8 times.
// team3's id appears 7 times
// team4's id appears once.
// The order of these apperances are random
function createRandomLayout(team1id, team2id, team3id, team4id) {
  // This JavaScript function always returns a random number between min and max (both included):
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let team1Pile = 9; // 9 '1' --> red card
  let team2Pile = 8; // 8 '2' --> blue card
  let team3Pile = 7; // 7 '3' --> white card
  let team4Pile = 1; // 1 '0' --> black card

  const mapping = {
    1: team1id,
    2: team2id,
    3: team3id,
    4: team4id,
  };

  let randomLayout = [];
  while (randomLayout.length < 25) {
    // get a int from 1, 2, 3, 4
    const randomInt = getRndInteger(1, 4);
    // Make sure that the pile isn't empty!
    if (mapping[randomInt] === team1id && team1Pile > 0) {
      team1Pile--;
      randomLayout.push(team1id);
    }
    if (mapping[randomInt] === team2id && team2Pile > 0) {
      team2Pile--;
      randomLayout.push(team2id);
    }
    if (mapping[randomInt] === team3id && team3Pile > 0) {
      team3Pile--;
      randomLayout.push(team3id);
    }
    if (mapping[randomInt] === team4id && team4Pile > 0) {
      team4Pile--;
      randomLayout.push(team4id);
    }
  }
  return randomLayout;
}

// POST localhost:3000/api/card/make25/forRoom/:roomId
// Given the boardId of the board to fill,
// and array of workpack ids, creates 25 cards.
router.post('/make25/forRoom/:roomId', async (req, res, next) => {
  try {
    // Get stuff out of req.body
    const { roomId } = req.params;
    const { selectedWordPackId } = req.body;

    // Find which pack users select and put all the candidate words in an array
    const allWords = await Word.findAll({
      where: {
        //findAll can work with an array
        wordpackId: selectedWordPackId,
      },
    });

    // Sanity check that the POSSIBLE words we will pull from were
    if (!allWords) return res.sendStatus(404);

    // This is an array of random word ids to pull from
    const randomWordsIds = getRandomIntArray(25, allWords.length);

    // Get the room for which we are making cards for (need its teams)
    const room = await Room.findByPk(roomId);
    // Sanity check the room being found
    if (!room) return res.sendStatus(404);
    // Get the teamIds that we will need to seed our cards
    const { team1id, team2id, team3id, team4id } = room;

    // Create a new board to put the 25 cards into
    // & Associate the board with the room
    const board = await Board.create({ roomId: room.id });

    console.log(board);

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
    console.log('inside api/card/get25/forRoom/' + roomId);

    const room = await Room.findByPk(roomId);
    if (!room) return res.sendStatus(404);

    const board = await Board.findOne({
      where: { roomId: room.id },
    });
    if (!board) return res.sendStatus(404);

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
