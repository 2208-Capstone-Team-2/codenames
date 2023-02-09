import React from 'react';
import Card from './Card';
import { useSelector } from 'react-redux';
import { ref, update } from 'firebase/database';
import { database } from '../../utils/firebase';
import { Button } from '@mui/material';
import { RootState } from '../../store/index.js';
import { CardObj, WordsWithTeamIdsObj } from '../../utils/interfaces';

const OperativeBoard = () => {
  const words = useSelector((state: RootState) => state.wordsInGame.wordsInGame);
  const roomId = useSelector((state: RootState) => state.player.roomId);
  const playerId = useSelector((state: RootState) => state.player.playerId);
  const teamOneRemainingCards = useSelector((state: RootState) => state.game.team1RemainingCards);
  const teamTwoRemainingCards = useSelector((state: RootState) => state.game.team2RemainingCards);
  const gameStatus = useSelector((state: RootState) => state.game.status);
  const { teamOneOperatives } = useSelector((state: RootState) => state.teamOne);
  const { teamTwoOperatives } = useSelector((state: RootState) => state.teamTwo);
  let gameRef = ref(database, 'rooms/' + roomId + '/game/');

  interface PlayerObj {
    playerId: string;
  }

  const teamOneOperativesIds = Object.values(teamOneOperatives).map((operative: PlayerObj) => {
    return operative.playerId;
  });
  const teamTwoOperativesIds = Object.values(teamTwoOperatives).map((operative: PlayerObj) => {
    return operative.playerId;
  });

  const endTurn = () => {
    console.log('ending turn');
    let nextStatus;
    // if cards remain on both sides, swap to the next teams turn
    if (teamOneRemainingCards && teamTwoRemainingCards) {
      if (gameStatus === 'team1OpsTurn') {
        nextStatus = 'team2SpyTurn';
        update(gameRef, { gameStatus: nextStatus, guessesRemaining: 0 });
      }
      if (gameStatus === 'team2OpsTurn') {
        nextStatus = 'team1SpyTurn';
        update(gameRef, { gameStatus: nextStatus, guessesRemaining: 0 });
      }
    }
  };

  return (
    <div className="board">
      {words.map((word: CardObj) => {
        return <Card key={word.id} word={word.word} id={word.id} isVisibleToAll={word.isVisibleToAll} wordString={word.wordString} wordId={word.wordId} boardId={word.boardId} teamId={word.teamId}  />;
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
