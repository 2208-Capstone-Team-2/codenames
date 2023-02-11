import React from 'react';
import '../RoomView/card.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
const WelcomeBoard = () => {
  const { username, roomId } = useSelector((state: RootState) => state.player);
  return (
    <div className="welcomeBoard">
      <p className="welcomeBoardItem">Welcome, {username}</p>
      <img src="/images/topBarLogo.svg" className="welcomeBoardImage" alt="codenames" />
      <p className="welcomeBoardItemLast">Room id: {roomId}</p>
    </div>
  );
};
export default WelcomeBoard;
