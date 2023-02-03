import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const GuessesRemaining = () => {
  const guessesRemaining = useSelector((state: RootState) => state.game.guessesRemaining);
  if (guessesRemaining) return <div>{guessesRemaining} guesses remaining</div>;
};

export default GuessesRemaining;
