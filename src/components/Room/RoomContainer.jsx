import React from 'react';
import SimpleRoom from './SimpleRoom';
import ResponsiveAppBar from '../ResponsiveAppBar';
import RoomView from '../RoomView/RoomView';
import FetchRoom from './FetchRoom';

function RoomContainer() {
  return (
    <div>
      <ResponsiveAppBar />
      <FetchRoom />
      <SimpleRoom />
      <RoomView />
    </div>
  );
}

export default RoomContainer;
