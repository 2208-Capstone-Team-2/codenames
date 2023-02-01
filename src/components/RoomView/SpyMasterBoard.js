/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { ref } from 'firebase/database';
import { database } from '../../utils/firebase';
import SpyCard from './SpyCard';
import Clue from './Clue.jsx';
const SpyMasterBoard = () => {
  const words = useSelector((state) => state.wordsInGame.wordsInGame);
  const roomId = useSelector((state) => state.player.roomId);
  const playerId = useSelector((state) => state.player.playerId);
  const gameStatus = useSelector((state) => state.game.status);
  const { teamOneSpymaster } = useSelector((state) => state.teamOne);
  const { teamTwoSpymaster } = useSelector((state) => state.teamTwo);
  let gameRef = ref(database, 'rooms/' + roomId + '/game/');
  const teamOneSpymasterId = Object.values(teamOneSpymaster).map((spy) => {
    return spy.playerId;
  });
  const teamTwoSpymasterId = Object.values(teamTwoSpymaster).map((spy) => {
    return spy.playerId;
  });

  return (
    <div className="board">
      {words.map((word) => {
        return <SpyCard key={word.id} word={word} teamId={word.teamId} />;
      })}
    </div>
  );
};

export default SpyMasterBoard;
