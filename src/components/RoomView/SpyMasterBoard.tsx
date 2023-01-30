/* eslint-disable no-unused-vars */
import React from 'react';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import SpyCard from './SpyCard';
const SpyMasterBoard = () => {

  const words = useSelector((state) => state.wordsInGame.wordsInGame);

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
      {words.map((word) => {
        return <SpyCard key={word.id} word={word} teamId={word.teamId} />;
      })}
    </div>
  );
};

export default SpyMasterBoard;
