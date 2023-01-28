import React, { useState } from 'react';
import SimpleRoom from './SimpleRoom';
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
      <SimpleRoom inputtedUsername={inputtedUsername} setInputtedUsername={setInputtedUsername} />
      <RoomView />
    </div>
  );
}

export default RoomContainer;
