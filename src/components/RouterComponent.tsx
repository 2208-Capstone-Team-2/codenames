import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Error from './Error';
import Footer from './Footer/Footer';
import Home from './Home/Home';
import Leaderboard from './Leaderboard/Leaderboard';
import RoomContainer from './Room/RoomContainer';
import UsernameModal from './RoomView/UserNameModal/UsernameModal';

const RouterComponent = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomId" element={<RoomContainer />} />
        <Route path="/404" element={<Error />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
};
export default RouterComponent;
