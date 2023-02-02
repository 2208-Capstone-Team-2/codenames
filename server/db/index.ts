import db from './db';
import Board from './models/board';
import Room from './models/room';
import Card from './models/card';
import Team from './models/team';
import Word from './models/word';
import Wordpack from './models/wordpack';
import Player from './models/player';
const data = {db,
Board,
Card,
Player,
Room,
Team,
Word,
Wordpack,
};
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
// **** Player/Room Associations: **** //
Player.belongsTo(Room);
Room.hasMany(Player);

export default data;