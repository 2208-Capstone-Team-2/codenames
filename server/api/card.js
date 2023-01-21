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
  let randomLayout = [];
  while (randomLayout.length < 25) {
    // find 1 int from 0 1 2 3
    const randomInt = getRndInteger(1, 4);
    // Make sure that the pile isn't empty!
    if (randomInt === team1id && team1Pile > 0) {
      team1Pile--;
      randomLayout.push(randomInt);
    }
    if (randomInt === team2id && team2Pile > 0) {
      team2Pile--;
      randomLayout.push(randomInt);
    }
    if (randomInt === team3id && team3Pile > 0) {
      team3Pile--;
      randomLayout.push(randomInt);
    }
    if (randomInt === team4id && team4Pile > 0) {
      team4Pile--;
      randomLayout.push(randomInt);
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

    // Create a new board to put the 25 cards into
    const board = await Board.create({ roomId });

    // Find which pack users select and put all the candidate words in an array
    const allWords = await Word.findAll({
      where: {
        //findAll can work with an array
        wordpackId: selectedWordPackId,
      },
    });

    // This is an array of random word ids to pull from
    const randomWordsIds = getRandomIntArray(25, allWords.length);

    // Get the teamIds that we will need to seed our cards
    const room = await Room.findByPk(roomId);
    const { team1id, team2id, team3id, team4id } = room;

    // If any of teamIds are falsey, immediately kick.
    if (!team1id || !team2id || !team3id || !team4id) res.sendStatus(404);

    console.log('teamIds:');
    console.log(team1id, team2id, team3id, team4id);
    const layout = createRandomLayout(team1id, team2id, team3id, team4id);

    console.log(`length is ${randomWordsIds.length} and randomWordsIds:`);
    console.log(randomWordsIds);
    console.log('layout: ');
    console.log(layout);

    const cards = [];

    //loop through the random index array
    for (let i = 0; i < 25; i++) {
      //assign the last number in layout array as the team number
      const teamId = layout.pop();
      const wordId = randomWordsIds.pop();
      // const cardObj = {
      //   //change this if front end needs more than the word itself
      //   word: allWords[randomWordsIds[i]].dataValues.word,
      //   isVisibleToAll: false,
      //   //so react return item can have a unique key={word.id}
      //   id: allWords[randomWordsIds[i]].dataValues.id,
      //   teamNumber,
      // };

      const card = {
        boardId: board.id,
        wordId,
        teamId,
      };
      //push the word object to the array and send to the front
      cards.push(card);
    }
    console.log(cards);
    res.send('hi');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
