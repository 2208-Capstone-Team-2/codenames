import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const GuessesRemaining = () => {
  const guessesRemaining = useSelector((state: RootState) => state.game.guessesRemaining);
  if (guessesRemaining) {
    return <p>{guessesRemaining} guesses remaining</p>;
  } else {
    return <></>;
  }
};

export default GuessesRemaining;
