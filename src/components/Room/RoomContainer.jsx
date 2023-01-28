import React from 'react';
import SimpleRoom from './SimpleRoom';
import ResponsiveAppBar from '../ResponsiveAppBar';
import RoomView from '../RoomView/RoomView';
import FetchRoom from './FetchRoom';
import SignInAnonymously from './SignInAnonymously';

function RoomContainer() {
  return (
    <div>
      <ResponsiveAppBar />
      <FetchRoom />
      <SignInAnonymously />
      <SimpleRoom />
      <RoomView />
    </div>
  );
}

export default RoomContainer;
