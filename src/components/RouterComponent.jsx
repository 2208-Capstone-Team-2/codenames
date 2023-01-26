import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, RoomView, About } from '.';
import Leaderboard from './Leaderboard/leaderboard';

const RouterComponent = () => {
  return (
    <Routes>
      {/*-------------------- home page---------------------*/}
      <Route path="/" element={<Login />} />
      {/*--------------------a page for room initialization---------------------*/}
      <Route path="/room/:id" element={<RoomView />} />
      {/*-------------------- a page for where the game actually takes place---------------------*/}
      <Route path="/room/:id/playing" />
      {/*-------------------- about us--------------------*/}
      <Route path="/about" element={<About />} />
      {/*--------------------leaderboard--------------------*/}
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  );
};
export default RouterComponent;
