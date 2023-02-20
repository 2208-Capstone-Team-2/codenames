import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import LinkToClipboard from './LinkToClipboard';
const WelcomeBoard = () => {
  const { username, roomId } = useSelector((state: RootState) => state.player);
  return (
    <div className="welcomeBoard">
      <p>Welcome, {username}</p>
      <div className="welcomeBoardItem">
        <img src="/images/topBarLogo.svg" alt="codenames" />
      </div>
      <LinkToClipboard />
    </div>
  );
};
export default WelcomeBoard;
