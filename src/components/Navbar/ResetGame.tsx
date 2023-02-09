import React from 'react';
import { ref, set } from 'firebase/database';
import { database } from '../../utils/firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
const ResetGame = () => {
  const { roomId } = useSelector((state: RootState) => state.player);
  const gameRef = ref(database, 'rooms/' + roomId + '/game/');
  const gameHistoryRef = ref(database, 'rooms/' + roomId + '/game/history');
  const cardsRef = ref(database, `rooms/${roomId}/gameboard`);

  const resetGame = () => {
    set(gameRef, { gameStatus: 'ready', team1RemainingCards: 9, team2RemainingCards: 8 });
    set(gameHistoryRef, {});
    set(cardsRef, {});
  };

  return (
    <div>
        <button className='welcomeBoardButton' onClick={resetGame}>
          Reset Game
        </button>
    </div>
  );
};

export default ResetGame;
