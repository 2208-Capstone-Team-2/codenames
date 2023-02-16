import { NextFunction, Request, Response, Router } from 'express';
const router = Router();
import db from '../db';
const Word = db.Word;
const Card = db.Card;
const Board = db.Board;
const Room = db.Room;
import { getRandomIntArray, createRandomLayout } from './cardHelperFunctions';

// POST localhost:3000/api/card/make25DEMO/forRoom/:roomId
// This will be used for our demo for having a static board we always pull from.
// That way when performing we can have our word clues prepped already.
router.post('/make25DEMO/forRoom/:roomId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get stuff out of req.body
    const { roomId } = req.params;

    // For the demo, we will ALWAYS USE from the default pack.

    // We need the teamIds that we will need to seed our cards - these are on room.
    // Find the room with this 'roomId' (is actually a name like jolly-panda)
    const room = await Room.findOne({
      where: { name: roomId },
    });
    if (!room) return res.sendStatus(404); // Sanity check

    // Get the teamIds
    const { team1id, team2id, team3id, team4id } = room;
    if (!team1id || !team2id || !team3id || !team4id) res.sendStatus(404); // Sanity check

    // Board and room are 1:1
    // Overwrite the previous linking of this room to any other board,
    // And give it the one we've just made and will soon make cards for.
    const board = await Board.create(); // Create a new board to put the 25 cards into
    room.setBoard(board);

    /*
  [
  { boardId: 1, wordId: 198, teamId: 2 },
  { boardId: 1, wordId: 64, teamId: 2 },
  { boardId: 1, wordId: 52, teamId: 2 },
  { boardId: 1, wordId: 27, teamId: 1 },
  { boardId: 1, wordId: 90, teamId: 2 },
  { boardId: 1, wordId: 183, teamId: 2 },
  { boardId: 1, wordId: 316, teamId: 3 },
  { boardId: 1, wordId: 174, teamId: 2 },
  { boardId: 1, wordId: 169, teamId: 1 },
  { boardId: 1, wordId: 376, teamId: 1 },
  { boardId: 1, wordId: 367, teamId: 1 },
  { boardId: 1, wordId: 284, teamId: 2 },
  { boardId: 1, wordId: 312, teamId: 1 },
  { boardId: 1, wordId: 24, teamId: 1 },
  { boardId: 1, wordId: 91, teamId: 3 },
  { boardId: 1, wordId: 58, teamId: 3 },
  { boardId: 1, wordId: 116, teamId: 3 },
  { boardId: 1, wordId: 201, teamId: 1 },
  { boardId: 1, wordId: 369, teamId: 3 },
  { boardId: 1, wordId: 395, teamId: 1 },
  { boardId: 1, wordId: 332, teamId: 2 },
  { boardId: 1, wordId: 93, teamId: 3 },
  { boardId: 1, wordId: 153, teamId: 1 },
  { boardId: 1, wordId: 278, teamId: 3 },
  { boardId: 1, wordId: 39, teamId: 4 }
  ]
  */
    /* Await and create the 25 cards that have:
     - the boardId of the board just created,
     - the teamIds mapped on correctly,
     - the pre-chosen wordIds
    */

    const card1 = await Card.create({ boardId: board.id, wordId: 198, teamId: team2id });
    const card1 = await Card.create({ boardId: board.id, wordId: 64, teamId: team2id });
    const card1 = await Card.create({ boardId: board.id, wordId: 52, teamId: team2id });
    const card1 = await Card.create({ boardId: board.id, wordId: 27, teamId: team1id });
    const card1 = await Card.create({ boardId: board.id, wordId: 90, teamId: team2id });
    const card1 = await Card.create({ boardId: board.id, wordId: 183, teamId: team2id });
    const card1 = await Card.create({ boardId: board.id, wordId: 316, teamId: team3id });
    const card1 = await Card.create({ boardId: board.id, wordId: 174, teamId: team2id });
    const card1 = await Card.create({ boardId: board.id, wordId: 169, teamId: team1id });
    const card1 = await Card.create({ boardId: board.id, wordId: 376, teamId: team1id });
    const card1 = await Card.create({ boardId: board.id, wordId: 367, teamId: team1id });
    const card1 = await Card.create({ boardId: board.id, wordId: 284, teamId: team2id });
    const card1 = await Card.create({ boardId: board.id, wordId: 312, teamId: team1id });
    const card1 = await Card.create({ boardId: board.id, wordId: 24, teamId: team1id });
    const card1 = await Card.create({ boardId: board.id, wordId: 91, teamId: team3id });
    const card1 = await Card.create({ boardId: board.id, wordId: 58, teamId: team3id });
    const card1 = await Card.create({ boardId: board.id, wordId: 116, teamId: team3id });
    const card1 = await Card.create({ boardId: board.id, wordId: 201, teamId: team1id });
    const card1 = await Card.create({ boardId: board.id, wordId: 369, teamId: team3id });
    const card1 = await Card.create({ boardId: board.id, wordId: 395, teamId: team1id });
    const card1 = await Card.create({ boardId: board.id, wordId: 332, teamId: team2id });
    const card1 = await Card.create({ boardId: board.id, wordId: 93, teamId: team3id });
    const card1 = await Card.create({ boardId: board.id, wordId: 153, teamId: team1id });
    const card1 = await Card.create({ boardId: board.id, wordId: 278, teamId: team3id });
    const card1 = await Card.create({ boardId: board.id, wordId: 39, teamId: team4id });
    // do until card25

    // const lucy = await Students.create({
    //   firstName: 'lucy',
    //   lastName: 'van ormer',
    //   email: 'luckylucy@hotmail.com',
    //   imageUrl: '/img/lucy.jpg',
    //   gpa: 4.0,
    // });

    // Everything below is the same as non-demo route:
    /****** At this point the cards have been seeded!
    We just need to: 
     - query so we can get the word ON to the card, from the Word Model association
     - exclude the teamId, so teamId does not live on the cards we send back, else easy to cheat!
    */
    const queriedCards = await Card.findAll({
      where: { boardId: board.id },
      include: [Word],
      attributes: { exclude: ['teamId'] },
    });
    res.send(queriedCards);
  } catch (err) {
    next(err);
  }
});

// POST localhost:3000/api/card/make25/forRoom/:roomId
// Given the boardId of the board to fill,
// and array of workpack ids, creates 25 cards.
router.post('/make25/forRoom/:roomId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get stuff out of req.body
    const { roomId } = req.params;
    const { selectedWordPackIds } = req.body;

    console.log({ selectedWordPackIds });
    // Find which pack users select and put all the candidate words in an array
    const allWords = await Word.findAll({
      where: {
        //findAll can work with an array
        wordpackId: selectedWordPackIds,
      },
    });

    if (!allWords) return res.sendStatus(404); // Sanity check
    const allWordsIds = allWords.map((word: { id: number }) => word.id);
    // This is an array of random word ids to pull from
    const randomWordsIds = getRandomIntArray(25, allWordsIds);

    // We need the teamIds that we will need to seed our cards - these are on room.
    // Find the room with this 'roomId' (is actually a name like jolly-panda)
    const room = await Room.findOne({
      where: { name: roomId },
    });
    if (!room) return res.sendStatus(404); // Sanity check

    // Get the teamIds
    const { team1id, team2id, team3id, team4id } = room;
    if (!team1id || !team2id || !team3id || !team4id) res.sendStatus(404); // Sanity check

    const layout = createRandomLayout(team1id, team2id, team3id, team4id);

    // Board and room are 1:1
    // Overwrite the previous linking of this room to any other board,
    // And give it the one we've just made and will soon make cards for.
    const board = await Board.create(); // Create a new board to put the 25 cards into
    room.setBoard(board);

    // Make an array of 25 cards objects
    const cards = [];
    for (let i = 0; i < 25; i++) {
      // Get a random teamId and wordId from our random arrays
      // layout: [33, 22, 22, 55, 54, 22, 33, 55 ....]
      const teamId = layout.pop();
      const wordId = randomWordsIds.pop();
      const card = { boardId: board.id, wordId, teamId };
      cards.push(card);
    }

    // Let these 25 Card Model creations run async, and await for them ALL to finish.
    const cardPromises = cards.map((card) => Card.create(card));

    console.log(cards);
    await Promise.all(cardPromises);

    /****** At this point the cards have been seeded!
    We just need to: 
     - query so we can get the word ON to the card, from the Word Model association
     - exclude the teamId, so teamId does not live on the cards we send back, else easy to cheat!
    */
    const queriedCards = await Card.findAll({
      where: { boardId: board.id },
      include: [Word],
      attributes: { exclude: ['teamId'] },
    });
    res.send(queriedCards);
  } catch (err) {
    next(err);
  }
});
// get cards for spymaster
// needs to be validated with jwt?
router.get('/get25/forRoom/:roomId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findOne({
      where: { name: roomId },
    });
    if (!room) return res.sendStatus(404);
    const board = await Board.findOne({
      where: { roomId: room.id },
    });
    if (!board) return res.sendStatus(404);
    const cardsWithTeamIds = await Card.findAll({
      where: { boardId: board.id },
      include: [Word],
    });
    !cardsWithTeamIds ? res.sendStatus(404) : res.send(cardsWithTeamIds);
  } catch (err) {
    next(err);
  }
});

// PUT localhost:3000/api/card/make25/forRoom/:roomId
// Updates a card, given its cardID
// probably used for toggling isVisibleToAll
router.put('/:wordId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { wordId } = req.params;
    const { roomId } = req.body;

    const room = await Room.findOne({
      where: { name: roomId },
    });
    if (!room) return res.sendStatus(404);
    const board = await Board.findOne({
      where: { roomId: room.id },
    });
    if (!board) return res.sendStatus(404);
    const cardToUpdate = await Card.findOne({
      where: { id: wordId, boardId: board.id },
      include: [Word],
    });
    if (!cardToUpdate) return res.sendStatus(404);
    const cardRevealed = await cardToUpdate.update({ isVisibleToAll: true });
    !cardRevealed ? res.sendStatus(404) : res.send(cardRevealed);
  } catch (err) {
    next(err);
  }
});

export default router;
