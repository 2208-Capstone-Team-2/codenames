/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import SpyCard from './SpyCard';
const SpyMasterBoard = () => {

  const words = useSelector((state: RootState) => state.wordsInGame.wordsInGame);

  interface WordObj {
    id: number;
    isVisibleToAll: boolean;
    word: string;
    wordId: number;
    boardId: number;
    teamId: number;
  }
  

  return (
    <div className="board">
      {words.map((word: WordObj) => {
        return <SpyCard key={word.id} word={word} teamId={word.teamId} />;
      })}
    </div>
  );
};

export default SpyMasterBoard;
