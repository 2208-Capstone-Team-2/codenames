import React from 'react';
import SimpleRoom from '../../SimpleRoom';
import ResponsiveAppBar from '../ResponsiveAppBar';
import RoomView from './RoomView';
import UsernameModal from './UsernameModal';

function RoomContainer() {
  return (
    <div>
      <ResponsiveAppBar />
      {/* <UsernameModal /> */}
      <SimpleRoom />
      <RoomView />
    </div>
  );
}

export default RoomContainer;
