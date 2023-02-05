import React from 'react';
import './card.css';
import { useSelector } from 'react-redux';
import ResetGame from './ResetGame';
import AllPlayers from './AllPlayers';
const WelcomeBoard = () => {
  const { username, roomId } = useSelector((state) => state.player);
  return (
    <div className="welcomeBoard">
      <p className="welcomeBoardItem">Welcome, {username}</p>
      <p className="welcomeBoardItem">Room id: {roomId}</p>
      <AllPlayers />
      <ResetGame />
    </div>
  );
};

export default WelcomeBoard;
