import React from 'react';
import './card.css';
import { useSelector } from 'react-redux';
import ResetGame from './ResetGame';
const WelcomeBoard = () => {
  const { playerId, username, roomId, isHost } = useSelector((state) => state.player);
  const { allPlayers } = useSelector((state) => state.allPlayers);
  return (
    <>
      <div className="welcomeBoard">
        <h3>Welcome, {username}</h3>
        <h3>Room id: {roomId}</h3>
        <h3>
          Players:
          {allPlayers?.map((player) => (
            <p key={player.playerId}>{player.username}</p>
          ))}
        </h3>
        <ResetGame />
      </div>
    </>
  );
};

export default WelcomeBoard;
