import React from 'react';
import { useSelector } from 'react-redux';

const GuessesRemaining = () => {
  const guessesRemaining = useSelector((state) => state.clues.guessesRemaining);
  if (guessesRemaining) return <div>You have {guessesRemaining} guesses remaining</div>;
};

export default GuessesRemaining;
