import React, { useEffect, useState } from 'react';
import Card from './Card.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { ref, update, onValue, get } from 'firebase/database';
import { database } from '../../utils/firebase';
import { Button } from '@mui/material';
import { setWordsInGame } from '../../store/wordsInGameSlice';

const Board = () => {
  const words = useSelector((state) => state.wordsInGame);
  const roomId = useSelector((state) => state.player.roomId);
  const playerId = useSelector((state) => state.player.playerId);
  const teamOneRemainingCards = useSelector((state) => state.game.team1RemainingCards);
  const teamTwoRemainingCards = useSelector((state) => state.game.team2RemainingCards);
  const gameStatus = useSelector((state) => state.game.status);
  const { teamOneOperatives, teamOneSpymaster } = useSelector((state) => state.teamOne);
  const { teamTwoOperatives, teamTwoSpymaster } = useSelector((state) => state.teamTwo);

  let gameRef = ref(database, 'rooms/' + roomId + '/game/');
  let cardsRef = ref(database, `rooms/${roomId}/gameboard`);

  const dispatch = useDispatch();

  console.log(teamOneSpymaster);
  const style = {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto auto auto',
    marginTop: '5%',
    gap: '2%',
    justifyContent: 'center',
    alightItems: 'center',
  };

  const submitAnswer = async (e) => {
    e.preventDefault();

    // need axios to check value of card

    // let cardId = e.target.value
    // let {data} = await axios.post('/api/answerKey/cardId', auth stuff)
    // let cardBelongsTo = data.teamId

    // reveal card color and disable clicking the card

    // values:
    // 0 = assassin
    // 1 = team 1
    // 2 = team 2
    // 3 = bystander
    let cardBelongsTo = e.target.value;

    const teamOneOpsIds = [];
    const teamTwoOpsIds = [];

    teamOneOperatives.forEach((operative) => {
      teamOneOpsIds.push(operative.playerId);
    });

    teamTwoOperatives.forEach((operative) => {
      teamTwoOpsIds.push(operative.playerId);
    });

    //  if its team 1 ops turn and they are the one who clicked on the card...
    if (gameStatus === 'team1OpsTurn' && teamOneOpsIds.includes(playerId)) {
      // reveal card
      if (cardBelongsTo === '0') {
        console.log('you hit the assassin! you lose.');
        // set winner = other team
        // do other celebratory stuff
        // show reset game button
      }
      if (cardBelongsTo === '3') {
        console.log('you hit a bystander!');
        endTurn();
      }
      if (cardBelongsTo === '1') {
        console.log('thats correct!');
        await update(gameRef, {
          team1RemainingCards: teamOneRemainingCards - 1,
        });
        // decrement from guesses remaining from spymasters clue
        // if guesses remaining === 0, endTurn()
      }
      if (cardBelongsTo === '2') {
        console.log('thats the other teams card! turn is over');
        update(gameRef, { team2RemainingCards: teamTwoRemainingCards - 1 });
        endTurn();
      }
    } else if (gameStatus === 'team2OpsTurn' && teamTwoOpsIds.includes(playerId)) {
      // reveal card
      if (cardBelongsTo === '0') {
        console.log('you hit the assassin! you lose.');
        // set winner = other team
        // do other celebratory stuff
        // show reset game button
      }
      if (cardBelongsTo === '3') {
        console.log('you hit a bystander!');
        endTurn();
      }
      if (cardBelongsTo === '2') {
        console.log('thats correct!');
        update(gameRef, { team2RemainingCards: teamTwoRemainingCards - 1 });
        // decrement from guesses remaining from spymasters clue
        // if guesses remaining === 0, endTurn()
      }
      if (cardBelongsTo === '1') {
        console.log('thats the other teams card! turn is over');
        update(gameRef, { team1RemainingCards: teamOneRemainingCards - 1 });
        endTurn();
      }
    } else {
      console.log('its not my turn');
    }
  };

  // changing turns depending on who clicks on the end turn button.
  // only operatives should see this button when its their 'turn'
  const endTurn = () => {
    console.log('ending turn');
    let nextStatus;
    // if cards remain on both sides, swap to the next teams turn
    if (teamOneRemainingCards && teamTwoRemainingCards) {
      if (gameStatus === 'team1OpsTurn') {
        nextStatus = 'team2SpyTurn';
        update(gameRef, { gameStatus: nextStatus });
      }
      if (gameStatus === 'team2OpsTurn') {
        nextStatus = 'team1SpyTurn';
        update(gameRef, { gameStatus: nextStatus });
      }
    }
  };

  // only spymaster whos turn it is should see the button that triggers this fxn
  // when the spymaster submits the clue, the operatives gets to guess next
  const submitClue = () => {
    console.log('submitting clue');
    // make sure clue is valid and doesnt contain any of the words on the board
    // clue number should not exceed cards remaining for that team
    // store the clue in clueHistory and as current clue
    // will have for ex: {teamSubmittingClue: 1, clue: string, numOfGuesses: 3}
    let nextGameStatus;
    // if its team1spy submission, team1Ops goes next
    if (gameStatus === 'team1SpyTurn') {
      nextGameStatus = 'team1OpsTurn';
      update(gameRef, { gameStatus: nextGameStatus });
    }
    // if its team2spy submission, team2Ops goes next
    if (gameStatus === 'team2SpyTurn') {
      nextGameStatus = 'team2OpsTurn';
      update(gameRef, { gameStatus: nextGameStatus });
    }
  };

  console.log('spy id', teamOneSpymaster[0]?.playerId);
  console.log({ playerId });

  // On load...
  useEffect(() => {
    // Look to see if there are cards already loaded for the room
    onValue(cardsRef, (snapshot) => {
      // If there are cards in /room/roomId/cards
      if (snapshot.exists()) {
        //update our redux to reflect that
        const cardsFromSnapshot = snapshot.val();
        const values = Object.values(cardsFromSnapshot);
        dispatch(setWordsInGame(values));
      }
    });
  }, []);

  return (
    <div style={style}>
      {words.wordsInGame.map((singleWord) => {
        return (
          <Card key={singleWord.id} singleWord={singleWord} value={singleWord.teamNumber} submitAnswer={submitAnswer} />
        );
      })}
      <Button variant="contained" onClick={endTurn}>
        end turn
      </Button>

      {/* is team 1 spy's turn and player is team1spymaster */}
      {gameStatus === 'team1SpyTurn' && teamOneSpymaster[0]?.playerId === playerId && (
        <Button variant="contained" onClick={submitClue}>
          submit clue
        </Button>
      )}

      {/* is team 2 spy's turn and player is team2spymaster */}
      {gameStatus === 'team2SpyTurn' && teamTwoSpymaster[0]?.playerId === playerId && (
        <Button variant="contained" onClick={submitClue}>
          submit clue
        </Button>
      )}
    </div>
  );
};

export default Board;
