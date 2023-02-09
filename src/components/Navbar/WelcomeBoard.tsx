import React from 'react';
import '../RoomView/card.css';
import { useSelector } from 'react-redux';
import ResetGame from './ResetGame';
import { RootState } from '../../store';
import MakeSpectator from '../RoomView/MakeSpectator';
const WelcomeBoard = () => {
  const { username, roomId, isHost, teamId } = useSelector((state: RootState) => state.player);
  return (

    <div className="welcomeBoard">
      <p className="welcomeBoardItem">Welcome, {username}</p>
      <div className='welcomeBoardItem'>
                <img src='/images/topBarLogo.svg' alt="codenames" />
            </div>
      <p className="welcomeBoardItem">Room id: {roomId}</p>
     {isHost && <ResetGame/>}
     {!teamId && <MakeSpectator/>}
    </div>

)}
export default WelcomeBoard