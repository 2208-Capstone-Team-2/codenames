import React, { useState } from 'react';
// Component Imports:
import UsernameForm from './UsernameForm';
import ResponsiveAppBar from '../ResponsiveAppBar';
import RoomView from '../RoomView/RoomView';
import FetchRoom from './FetchRoom';
import SignInAnonymously from './SignInAnonymously';
import OnAuthStateChanged from './OnAuthStateChanged';

function RoomContainer() {
  const [inputtedUsername, setInputtedUsername] = useState('');

  return (
    <div>
      <ResponsiveAppBar />
      <FetchRoom />
      <SignInAnonymously />
      <OnAuthStateChanged setInputtedUsername={setInputtedUsername} />
      <UsernameForm inputtedUsername={inputtedUsername} setInputtedUsername={setInputtedUsername} />
      <RoomView />
    </div>
  );
}

export default RoomContainer;
