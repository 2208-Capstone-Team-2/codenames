import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, RoomView, About } from '.';
import SimpleHomepage from '../SimpleHomepage';
import SimpleRoom from '../SimpleRoom';

const RouterComponent = () => {
  return (
    <Routes>
      {/*-------------------- home page---------------------*/}
      <Route path="/" element={<SimpleHomepage />} />
      {/*--------------------a page for room initialization---------------------*/}
      <Route path="/room/:roomName" element={<SimpleRoom />} />
    </Routes>
  );
};
export default RouterComponent;
