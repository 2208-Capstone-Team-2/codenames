import React from 'react';
import { Button } from '@mui/material';
import { ref, update, set } from 'firebase/database';
import { database } from '../../utils/firebase';
import { useSelector } from 'react-redux';

const ResetGame = () => {
  const { roomId } = useSelector((state) => state.player);
  const gameRef = ref(database, 'rooms/' + roomId + '/game/');
  const cluesRef = ref(database, 'rooms/' + roomId + '/clues/');
  const cardsRef = ref(database, `rooms/${roomId}/gameboard`);

  //   the below line wont exist once my other PR goes through, but i need it for testing purposes
  const spymasterCardsRef = ref(database, `rooms/${roomId}/spymasterGameboard`);

  const showResetButton = useSelector((state) => state.game.showResetButton);
  const resetGame = () => {
    set(gameRef, { gameStatus: 'ready', team1RemainingCards: 9, team2RemainingCards: 8 });
    set(cluesRef, {});
    set(cardsRef, {});
    set(spymasterCardsRef, {});

    // make axios request to backend clearing out the board since 'isVisibleToAll' = true will remain on those cards
  };

  return (
    <div>
      {showResetButton && (
        <Button variant="contained" onClick={resetGame}>
          Reset Game
        </Button>
      )}
    </div>
  );
};

export default ResetGame;
