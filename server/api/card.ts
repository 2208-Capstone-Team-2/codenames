import express, { NextFunction, Request, Response, Router } from "express";
const router = Router();
import { Word, Card, Board, Room } from '../db';
import { getRandomIntArray, createRandomLayout } from './cardHelperFunctions';

// POST localhost:3000/api/card/make25/forRoom/:roomId
// Given the boardId of the board to fill,
// and array of workpack ids, creates 25 cards.
router.post('/make25/forRoom/:roomId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get stuff out of req.body
    const { roomId } = req.params;
    const { selectedWordPackId } = req.body;

    // Find which pack users select and put all the candidate words in an array
    const allWords = await Word.findAll({
      where: {
        //findAll can work with an array
        wordpackId: selectedWordPackId,
      },
    });

    if (!allWords) return res.sendStatus(404); // Sanity check

    const allWordsIds = allWords.map((word) => word.id);
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

    const board = await Board.findOne({
      where: { roomId: room.id },
    });

    const cardsWithTeamIds = await Card.findAll({
      where: { boardId: board.id },
      include: [Word],
    });

    res.send(cardsWithTeamIds);
  } catch (err) {
    next(err);
  }
});

// PUT localhost:3000/api/card/make25/forRoom/:roomId
// Updates a card, given its cardID
// probably used for toggling isVisibleToAll
router.put('/:wordId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // TODO!!!!!!!
    const { wordId } = req.params;
    const { roomId } = req.body;

    const room = await Room.findOne({
      where: { name: roomId },
    });

    const board = await Board.findOne({
      where: { roomId: room.id },
    });

    const cardToUpdate = await Card.findOne({
      where: { id: wordId, boardId: board.id },
      include: [Word],
    });

    let cardRevealed = await cardToUpdate.update({ isVisibleToAll: true });

    res.send(cardRevealed);
  } catch (err) {
    next(err);
  }
});

export default router;
