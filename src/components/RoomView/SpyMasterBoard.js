/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { ref } from 'firebase/database';
import SpyCard from './SpyCard';

const SpyMasterBoard = () => {
  const words = useSelector((state) => state.wordsInGame.wordsInGame);

  return (
    <div className="board">
      {words.map((word) => {
        return <SpyCard key={word.id} word={word} teamId={word.teamId} />;
      })}
    </div>
  );
};

export default SpyMasterBoard;
