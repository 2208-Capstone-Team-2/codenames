const db = require("../db");
const { Word, Wordpack } = require("../index");
const duetPackString = require("../wordpacks/duetPack");

const seedDuetWordpack = async () => {
  const wordArray = duetPackString.split("\n"); // split the string on 'return' characters

  // First, create the Wordpack model
  const duetPack = await Wordpack.create({
    name: "duet",
  });

  // Create the 400 wordbanks.

  // Make array of promises
  const Promises = wordArray.map((str) => {
    return Word.create({
      word: str,
    });
  });

  // Now await all those promises to seed
  const wordModels = await Promise.all(Promises);

  // Create association between the pack and all the words.
  // Using magic method.
  duetPack.setWords(wordModels);

  console.log("DONE SEEDING DUET WORDPACK...");
};

module.exports = seedDuetWordpack;
