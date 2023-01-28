import React from 'react';
import { useSelector } from 'react-redux';

const GuessesRemaining = () => {
  const guessesRemaining = useSelector((state) => state.game.guessesRemaining);
  if (guessesRemaining) return <div>You have {guessesRemaining} guesses remaining</div>;
};

export default GuessesRemaining;
