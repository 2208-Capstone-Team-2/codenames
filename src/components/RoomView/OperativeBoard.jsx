import React, { useEffect, useState } from 'react';
import Card from './Card.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { ref, update, onValue, get } from 'firebase/database';
import { database } from '../../utils/firebase';
import { Button } from '@mui/material';
import { setWordsInGame } from '../../store/wordsInGameSlice';

const OperativeBoard = () => {
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

  const teamOneOperativesIds = Object.values(teamOneOperatives).map((operative) => {
    return operative.playerId;
  });
  const teamTwoOperativesIds = Object.values(teamTwoOperatives).map((operative) => {
    return operative.playerId;
  });

  const style = {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto auto auto',
    marginTop: '5%',
    gap: '2%',
    justifyContent: 'center',
    alightItems: 'center',
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

  return (
    <div style={style}>
      {words.wordsInGame.map((singleWord) => {
        return <Card key={singleWord.id} singleWord={singleWord} value={singleWord.teamNumber} />;
      })}

      {gameStatus === 'team1OpsTurn' && teamOneOperativesIds.includes(playerId) && (
        <Button variant="contained" onClick={endTurn}>
          End Turn{' '}
        </Button>
      )}
      {gameStatus === 'team2OpsTurn' && teamTwoOperativesIds.includes(playerId) && (
        <Button variant="contained" onClick={endTurn}>
          End Turn{' '}
        </Button>
      )}
    </div>
  );
};

export default OperativeBoard;
