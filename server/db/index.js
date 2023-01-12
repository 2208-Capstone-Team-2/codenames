const db = require("./db");
// Import models:
const Word = require("./models/Word");
const Wordpack = require("./models/wordpack");

// Model Associations go here
//

// A word belongs to a specific pack
// A pack has many words in it.
Word.belongsTo(Wordpack);
Wordpack.hasMany(Word);

module.exports = {
  db,
  Word,
  Wordpack,
};
