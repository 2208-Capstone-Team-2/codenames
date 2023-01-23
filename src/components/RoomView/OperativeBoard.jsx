import React from 'react';
import Card from './Card.jsx';
import { useSelector } from 'react-redux';
import { ref, update } from 'firebase/database';
import { database } from '../../utils/firebase';
import { Button } from '@mui/material';

const OperativeBoard = () => {
  const words = useSelector((state) => state.wordsInGame.wordsInGame);
  const roomId = useSelector((state) => state.player.roomId);
  const playerId = useSelector((state) => state.player.playerId);
  const teamOneRemainingCards = useSelector((state) => state.game.team1RemainingCards);
  const teamTwoRemainingCards = useSelector((state) => state.game.team2RemainingCards);
  const gameStatus = useSelector((state) => state.game.status);
  const { teamOneOperatives } = useSelector((state) => state.teamOne);
  const { teamTwoOperatives } = useSelector((state) => state.teamTwo);
  let gameRef = ref(database, 'rooms/' + roomId + '/game/');

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
      {words.map((word) => {
        return <Card key={word.id} word={word} />;
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
