import React from 'react';
import '../RoomView/card.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import LinkToClipboard from '../RoomView/LinkToClipboard';
const WelcomeBoard = () => {
  const { username, roomId } = useSelector((state: RootState) => state.player);
  return (
    <div className="welcomeBoard">
      <p className="welcomeBoardItem">Welcome, {username}</p>
      <div className="welcomeBoardItem">
        <img src="/images/topBarLogo.svg" alt="codenames" />
      </div>
      <div className="roomIDAndCopy">
        <p className="welcomeBoardItem">Room id: {roomId}</p>
        <LinkToClipboard />
      </div>
    </div>
  );
};
export default WelcomeBoard;
