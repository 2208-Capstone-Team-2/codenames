/* eslint-disable no-unused-vars */
import React from 'react';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
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
  
  const style = {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto auto auto',
    marginTop: '5%',
    gap: '2%',
    justifyContent: 'center',
    alightItems: 'center',
  };

  return (
    <div style={style}>
      {words.map((word: WordObj) => {
        return <SpyCard key={word.id} word={word} teamId={word.teamId} />;
      })}
    </div>
  );
};

export default SpyMasterBoard;
