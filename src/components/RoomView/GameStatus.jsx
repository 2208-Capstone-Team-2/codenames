import React from 'react';
import { useSelector } from 'react-redux';
import GuessesRemaining from './GuessesRemaining';

const GameStatus = () => {
  let gameStatus = useSelector((state) => state.game.status);

  return (
    <div>
      {gameStatus !== 'ready' && (
        <>
          Turn:
          {gameStatus}
          <GuessesRemaining />
        </>
      )}
    </div>
  );
};

export default GameStatus;
