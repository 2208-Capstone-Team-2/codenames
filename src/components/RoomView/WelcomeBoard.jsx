import React from 'react';
import './card.css';
import { useSelector } from 'react-redux';
import ResetGame from './ResetGame';
import AllPlayers from './AllPlayers';
const WelcomeBoard = () => {
  const { username, roomId } = useSelector((state) => state.player);
  return (
    <>
      <div className="welcomeBoard">
        <h3>Welcome, {username}</h3>
        <p>Room id: {roomId}</p>
        <AllPlayers />
        <ResetGame />
      </div>
    </>
  );
};

export default WelcomeBoard;
