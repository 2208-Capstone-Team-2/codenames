/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import Clue from '../clue/Clue';
import SpyCard from './SpyCard';

const SpyMasterBoard = () => {
  const words = useSelector((state: RootState) => state.wordsInGame.wordsInGame);
  return (
    <div className="boardContainer">
      {/* Todo: want to move logic for if to show clue, here!  */}
      <Clue />

      <div className="board">
        {words.map((word) => {
          return <SpyCard key={word.id} word={word} teamId={word.teamId} />;
        })}
      </div>
    </div>
  );
};

export default SpyMasterBoard;
