import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, RoomView, About } from '.';
import SimpleHomepage from './Home/SimpleHomepage';
import Error from './Error';
import RoomContainer from './Room/RoomContainer';

const RouterComponent = () => {
  return (
    <Routes>
      {/*-------------------- home page---------------------*/}
      <Route path="/" element={<SimpleHomepage />} />
      {/*--------------------a page for room initialization---------------------*/}
      <Route path="/room/:roomId" element={<RoomContainer />} />
      <Route path="/404" element={<Error />} />
    </Routes>
  );
};
export default RouterComponent;
