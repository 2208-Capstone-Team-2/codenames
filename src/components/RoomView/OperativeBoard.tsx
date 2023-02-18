import React from 'react';
import Card from './Card';
import { useSelector } from 'react-redux';
import { child, push, ref, update } from 'firebase/database';
import { database } from '../../utils/firebase';
import { RootState } from '../../store/index.js';
import { CardObj, SingleHistoryObject } from '../../utils/interfaces';
import './endTurnButton.css';

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
  let gameHistoryRef = ref(database, 'rooms/' + roomId + '/game/' + 'history');
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
        const newGameHistory: string = 'Team 1 operatives ended their turn prematurely';
        const newHistoryKey = push(child(ref(database), 'history')).key;
        console.log(newGameHistory);
        const updates = {} as SingleHistoryObject;
        updates[`${newHistoryKey}`] = newGameHistory;
        update(gameHistoryRef, updates);
        update(gameRef, { gameStatus: nextStatus, guessesRemaining: 0 });
      }
      if (gameStatus === 'team2OpsTurn') {
        nextStatus = 'team1SpyTurn';
        const newGameHistory: string = 'Team 2 operatives ended their turn prematurely';
        const newHistoryKey = push(child(ref(database), 'history')).key;
        const updates = {} as SingleHistoryObject;
        updates[`${newHistoryKey}`] = newGameHistory;
        update(gameHistoryRef, updates);
        update(gameRef, { gameStatus: nextStatus, guessesRemaining: 0 });
      }
    }
  };

  return (
    <div className="board">
      {words.map((word: CardObj) => {
        return (
          <Card
            key={word.id}
            word={word.word}
            id={word.id}
            isVisibleToAll={word.isVisibleToAll}
            wordString={word.wordString}
            wordId={word.wordId}
            boardId={word.boardId}
            teamId={word.teamId}
          />
        );
      })}
      <div className="endTurnButtons">
        {gameStatus === 'team1OpsTurn' && teamOneOperativesIds.includes(playerId) && (
          <button className="btn btn-background-circle" onClick={endTurn}>
            End Turn{' '}
          </button>
        )}
        {gameStatus === 'team2OpsTurn' && teamTwoOperativesIds.includes(playerId) && (
          <button className="btn btn-background-circle" onClick={endTurn}>
            End Turn{' '}
          </button>
        )}
      </div>
    </div>
  );
};

export default OperativeBoard;
