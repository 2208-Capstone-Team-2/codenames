/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { ref } from 'firebase/database';
import { database } from '../../utils/firebase';
import SpyCard from './SpyCard';
import Clue from './Clue.jsx';
const SpyMasterBoard = () => {
  const words = useSelector((state) => state.wordsInGame);
  const roomId = useSelector((state) => state.player.roomId);
  const playerId = useSelector((state) => state.player.playerId);
  const gameStatus = useSelector((state) => state.game.status);
  const { teamOneOperatives, teamOneSpymaster } = useSelector((state) => state.teamOne);
  const { teamTwoOperatives, teamTwoSpymaster } = useSelector((state) => state.teamTwo);
  let gameRef = ref(database, 'rooms/' + roomId + '/game/');

  const teamOneSpymasterId = Object.values(teamOneSpymaster).map((spy) => {
    return spy.playerId;
  });
  const teamTwoSpymasterId = Object.values(teamTwoSpymaster).map((spy) => {
    return spy.playerId;
  });

  const style = {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto auto auto',
    marginTop: '5%',
    gap: '2%',
    justifyContent: 'center',
    alightItems: 'center',
  };

  return (
    <>
      <div style={style}>
        {words.wordsInGame.map((singleWord) => {
          return <SpyCard key={singleWord.id} singleWord={singleWord} value={singleWord.teamNumber} />;
        })}
      </div>
      <Clue />
    </>
  );
};

export default SpyMasterBoard;
