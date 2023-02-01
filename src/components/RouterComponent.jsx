import React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './About';
import Error from './Error';
import Home from './Home/Home';
import Leaderboard from './Leaderboard/Leaderboard';
import RoomContainer from './Room/RoomContainer';

const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/room/:roomId" element={<RoomContainer />} />
      <Route path="/about" element={<About />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/404" element={<Error />} />
      <Route path="/*" element={<Error />} />
    </Routes>
  );
};
export default RouterComponent;
