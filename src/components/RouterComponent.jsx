import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, RoomView, About } from '.';

const RouterComponent = () => {
  return (
    <Routes>
      {/*-------------------- home page---------------------*/}
      <Route path="/" element={<SimpleLogin />} />
      {/*--------------------a page for room initialization---------------------*/}
      <Route path="/room/:roomName" element={<SimpleRoom />} />
    </Routes>
  );
};
export default RouterComponent;
