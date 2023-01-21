const db = require('./db');
// Import models:
const Room = require('./models/room');
const Word = require('./models/Word');
const Wordpack = require('./models/wordpack');
const Team = require('./models/team');
const Card = require('./models/card');

// Model Associations go here

// A word belongs to a specific pack
// A pack has many words in it.
Word.belongsTo(Wordpack);
Wordpack.hasMany(Word);

// **** Card Associations: **** //
// Card is a child of Word (this line created wordId on Card models)
Card.belongsTo(Word);
// A word can belong to many cards
Word.hasMany(Card);

// a card belongs to one team
Card.belongsTo(Team);
// a team has many cards
Team.hasMany(Card);

// **** Room Associations: **** //
// A room has many teams, a team can only belong to One room
Room.hasMany(Team);
Team.belongsTo(Room);

module.exports = {
  db,
  Room,
  Word,
  Wordpack,
  Team,
  Card,
};
