import React from 'react';
import './card.css';
import { useSelector } from 'react-redux';
import ResetGame from './ResetGame';
import AllPlayers from './AllPlayers'
import { RootState } from '../../store';
const WelcomeBoard = () => {
  const { username, roomId } = useSelector((state: RootState) => state.player);
  return (
    <>
      <div className="welcomeBoard">
        <h3>Welcome, {username}</h3>
        <h3>Room id: {roomId}</h3>
        <h3>
          <AllPlayers />
        </h3>
        <ResetGame />
      </div>
    </>
  );
};

export default WelcomeBoard;
