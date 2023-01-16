const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const { Word, Wordpack } = require("../db");

// GET localhost:3000/api/25words
router.post("/", async (req, res, next) => {
  //  find which pack users select
  const { selectedWordPackId } = req.body;
  const allWords = await Word.findAll({
    where: {
      wordpackId: selectedWordPackId,
    },
  });
  function getRandomInt(quantity, max) {
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
    let team4Pile = 1; // 1 '4' --> black card
    let randomLayout = [];
    while (randomLayout.length < 25) {
      // Roll the d4
      const randomInt = getRandomInt(1, 4);
      // If we 'rolled' a 1, pick from the red pile to slot into the string
      if (randomInt[0] === 0 && team1Pile > 0) {
        team1Pile--;
        randomLayout.push(0);
      }

      if (randomInt[0] === 1 && team2Pile > 0) {
        team2Pile--;
        randomLayout.push(1);
      }

      if (randomInt[0] === 2 && team3Pile > 0) {
        team3Pile--;
        randomLayout.push(2);
      }

      if (randomInt[0] === 3 && team4Pile > 0) {
        team4Pile--;
        randomLayout.push(3);
      }
    }
    console.log(randomLayout);
    return randomLayout;
  }

  const randomWordsIndex = getRandomInt(25, allWords.length);
  const finalWords = [];
  const layout = createRandomLayout();
  console.log(layout);
  for (let i = 0; i < randomWordsIndex.length; i++) {
    const teamNumber = layout.pop();
    const word = {
      word: allWords[randomWordsIndex[i]],
      isVisibleToAll: false,
      teamNumber,
    };

    finalWords.push(word);
  }
  console.log(finalWords);
  res.send(finalWords);
});

module.exports = router;
