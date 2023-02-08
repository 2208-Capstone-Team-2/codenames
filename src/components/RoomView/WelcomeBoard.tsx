import React from 'react';
import './card.css';
import { useSelector } from 'react-redux';
import ResetGame from './ResetGame';
import { RootState } from '../../store';
import MakeSpectator from './MakeSpectator';

const WelcomeBoard = () => {
  const { username, roomId, isHost, isSpectator } = useSelector((state: RootState) => state.player);

  return (

    <div className="welcomeBoard">
      <p className="welcomeBoardItem">Welcome, {username}</p>
      <p className="welcomeBoardItem">Room id: {roomId}</p>
      <div className="break"></div>
      {isHost && <ResetGame />}
      {!isSpectator && <MakeSpectator/>} 
    </div>

)}
export default WelcomeBoard