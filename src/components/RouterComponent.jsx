import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Error from './Error';
import Home from './Home/Home';
import RoomContainer from './Room/RoomContainer';
const RouterComponent = () => {
  return (
    <Routes>
      {/*-------------------- home page---------------------*/}
      <Route path="/" element={<Home />} />
      {/*--------------------a page for room initialization---------------------*/}
      <Route path="/room/:roomId" element={<RoomContainer />} />
      <Route path="/404" element={<Error />} />
    </Routes>
  );
};
export default RouterComponent;
