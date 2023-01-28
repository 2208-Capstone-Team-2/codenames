import React from 'react';
import SimpleRoom from './SimpleRoom';
import ResponsiveAppBar from '../ResponsiveAppBar';
import RoomView from '../RoomView/RoomView';

function RoomContainer() {
  return (
    <div>
      <ResponsiveAppBar />
      <SimpleRoom />
      <RoomView />
    </div>
  );
}

export default RoomContainer;
