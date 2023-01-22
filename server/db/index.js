const db = require('./db');
// Import models:
const Board = require('./models/board');
const Room = require('./models/room');
const Card = require('./models/card');
const Team = require('./models/team');
const Word = require('./models/Word');
const Wordpack = require('./models/wordpack');
const Player = require('./models/player');

// Model Associations go here

// **** Board Associations: **** //
// Room <-> Board is 1:1
Room.hasOne(Board);
Board.belongsTo(Room);
// Board has 25 Cards, a card can only belong to one specific board.
Board.hasMany(Card);
Card.belongsTo(Board);

// **** Card Associations: **** //
// Card is a child of Word (this line created wordId on Card models)
Card.belongsTo(Word);
// A word can belong to many cards
Word.hasMany(Card);
// A card can only belong to one specific board.
Card.belongsTo(Team);
// A team has many cards
Team.hasMany(Card);

// **** Room Associations: **** //
// A room has many teams, a team can only belong to One room
Room.hasMany(Team);
Team.belongsTo(Room);

// **** Word/Wordpack Associations: **** //
// A word belongs to a specific pack
// A pack has many words in it.
Word.belongsTo(Wordpack);
Wordpack.hasMany(Word);
// **** Player/Team Associations: **** //
Player.belongsTo(Team);
Team.hasMany(Player);

module.exports = {
  db,
  Board,
  Card,
  Player,
  Room,
  Team,
  Word,
  Wordpack,
};
