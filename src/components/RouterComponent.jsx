import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, RoomView, About } from '.';

const RouterComponent = () => {
  return (
    <Routes>
      {/*-------------------- home page---------------------*/}
      <Route path="/" element={<Login />} />
      {/*--------------------a page for room initialization---------------------*/}
      <Route path="/room/:roomName" element={<RoomView />} />
      {/*-------------------- about us--------------------*/}
      <Route path="/about" element={<About />} />
    </Routes>
  );
};
export default RouterComponent;
