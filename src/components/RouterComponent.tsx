import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Error from './Error';

import Home from './Home/Home';
// import About from './About';
import Leaderboard from './Leaderboard/Leaderboard';
import RoomContainer from './Room/RoomContainer';
import About from './Home/About';
import FAQ from './Home/FAQ';
import Terms from './Home/terms';
const RouterComponent = () => {
  return (
    <>
      <Routes>
        {/*-------------------- home page---------------------*/}
        <Route path="/" element={<Home />} />
        {/*--------------------a page for room initialization---------------------*/}
        <Route path="/room/:roomId" element={<RoomContainer />} />
        <Route path="/404" element={<Error />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  );
};
export default RouterComponent;
