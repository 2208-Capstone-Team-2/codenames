import React, { useEffect } from 'react';
import HomeToPlayPop from './HowToPlayPop';
import Leaderboard from '../../Leaderboard/Leaderboard';
import { Link } from 'react-router-dom';
import './homeNav.css';
const HomeNav = () => {
  return (
    <div className="homeNav">
      <Link to={'/about'}>
        <button className="aboutBtn">About Us</button>
      </Link>
      <div>
        <HomeToPlayPop />
        <Link to={'/leaderboard'}>
          <button className="leaderboardBtn">Leaderboard</button>
        </Link>
      </div>
    </div>
  );
};

export default HomeNav;
