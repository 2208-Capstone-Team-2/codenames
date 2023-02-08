import React from 'react';
import '../RoomView/card.css';
import { useSelector } from 'react-redux';
import ResetGame from '../RoomView/ResetGame';
import { RootState } from '../../store';
const WelcomeBoard = () => {
  const { username, roomId, isHost } = useSelector((state: RootState) => state.player);

  return (

    <div className="welcomeBoard">
      <p className="welcomeBoardItem">Welcome, {username}</p>
      <div className='welcomeBoardItem'>
                <img src='/images/topBarLogo.svg' alt="codenames" />
            </div>
      <p className="welcomeBoardItem">Room id: {roomId}</p>
      <div className="break"></div>
      {isHost && <ResetGame />}
    </div>

)}
export default WelcomeBoard