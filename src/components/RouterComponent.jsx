import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Error from './Error';
import Home from './Home/Home';
import Leaderboard from './Leaderboard/Leaderboard';
import RoomContainer from './Room/RoomContainer';
const RouterComponent = () => {
  return (
    <Routes>
      {/*-------------------- home page---------------------*/}
      <Route path="/" element={<Home />} />
      {/*--------------------a page for room initialization---------------------*/}
      <Route path="/room/:roomId" element={<RoomContainer />} />
      <Route path="/404" element={<Error />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  );
};
export default RouterComponent;
