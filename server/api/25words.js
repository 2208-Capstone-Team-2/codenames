const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const { Word, Wordpack } = require("../db");

// GET localhost:3000/api/25words
router.post("/", async (req, res, next) => {
  //  find which pack users select
  const { selectedWordPackId } = req.body;
  function getRandomInt(quantity, max) {
    const arr = [];
    while (arr.length < quantity) {
      let candidateInt = Math.floor(Math.random() * (max + 1));
      if (arr.indexOf(candidateInt) === -1) arr.push(candidateInt);
    }
    return arr;
  }

  const allWords = await Word.findAll({
    where: {
      wordpackId: selectedWordPackId,
    },
  });
  const randomWordsIndex = getRandomInt(25, allWords.length);
  const finalWords = [];
  for (let i = 0; i < randomWordsIndex.length; i++) {
    finalWords.push(allWords[randomWordsIndex[i]]);
  }

  res.send(finalWords);
});

module.exports = router;
