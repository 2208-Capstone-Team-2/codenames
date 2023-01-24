/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { ref } from 'firebase/database';
import { database } from '../../utils/firebase';
import SpyCard from './SpyCard';
import Clue from './Clue.jsx';
const SpyMasterBoard = () => {
  const spyWords = useSelector((state) => state.spymasterWords.spymasterWords);

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
      {spyWords.map((word) => {
        return <SpyCard key={word.id} word={word} teamId={word.teamId} />;
      })}
    </div>
  );
};

export default SpyMasterBoard;
