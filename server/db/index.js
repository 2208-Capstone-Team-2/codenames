const db = require('./db');
// Import models:
const Word = require('./models/Word');
const Wordpack = require('./models/wordpack');
const Team = require('./models/team');
const Card = require('./models/card');

// Model Associations go here
//
// A word belongs to a specific pack
// A pack has many words in it.
Word.belongsTo(Wordpack);
Wordpack.hasMany(Word);

//Card Associations:
// a Card has one word,in order to have card id on it
Card.belongsTo(Word);
// A word can belong to many cards
Word.hasMany(Card);

// a card belongs to one team
Card.belongsTo(Team);
// a team has many cards
Team.hasMany(Card);

module.exports = {
  db,
  Word,
  Wordpack,
  Team,
  Card,
};
