// ******************************************************** //
// ******************************************************** //

//************** THIS ROUTE IS THE OLD ROUTE THAT DOESN'T USE THE NEW MODELS!! **************/

// ******************************************************** //
// ******************************************************** //

const express = require('express');
const router = express.Router();
const { Word } = require('../db');

//a function to get "quantity" of unique random interger, from 0 - max (inclusive)
function getRandomIntArray(quantity, max) {
  const arr = [];
  while (arr.length < quantity) {
    let candidateInt = Math.floor(Math.random() * (max + 1));
    if (arr.indexOf(candidateInt) === -1) arr.push(candidateInt);
  }
  return arr;
}

function createRandomLayout() {
  let team1Pile = 9; // 9 '1' --> red card
  let team2Pile = 8; // 8 '2' --> blue card
  let team3Pile = 7; // 7 '3' --> white card
  let team0Pile = 1; // 1 '0' --> black card
  let randomLayout = [];
  while (randomLayout.length < 25) {
    // find 1 int from 0 1 2 3
    const randomInt = getRandomIntArray(1, 4)[0];
    // If we 'rolled' a 0, pick from the red pile to slot into the string
    if (randomInt === 0 && team0Pile > 0) {
      team0Pile--;
      randomLayout.push(0);
    }
    if (randomInt === 1 && team1Pile > 0) {
      team1Pile--;
      randomLayout.push(1);
    }
    if (randomInt === 2 && team2Pile > 0) {
      team2Pile--;
      randomLayout.push(2);
    }
    if (randomInt === 3 && team3Pile > 0) {
      team3Pile--;
      randomLayout.push(3);
    }
  }
  return randomLayout;
}

// POST localhost:3000/api/cards/make25
// Given an array of workpack ids, creates 25 cards.
router.post('/make25', async (req, res, next) => {
  try {
    console.log('inside make 25 cards');
    //  find which pack users select and put all the candidate words in an array
    const { selectedWordPackId } = req.body;

    const allWords = await Word.findAll({
      where: {
        //findAll can work with an array
        wordpackId: selectedWordPackId,
      },
    });

    //get 25 random index from allwords (see line 10)
    const randomWordsIndexArray = getRandomIntArray(25, allWords.length);
    const finalWords = [];
    const layout = createRandomLayout();

    //loop through the random index array
    for (let i = 0; i < randomWordsIndexArray.length; i++) {
      //assign the last number in layout array as the team number
      const teamNumber = layout.pop();
      const word = {
        //change this if front end needs more than the word itself
        word: allWords[randomWordsIndexArray[i]].dataValues.word,
        isVisibleToAll: false,
        //so react return item can have a unique key={word.id}
        id: allWords[randomWordsIndexArray[i]].dataValues.id,
        teamNumber,
      };
      //push the word object to the array and send to the front
      finalWords.push(word);
    }
    res.send(finalWords);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
