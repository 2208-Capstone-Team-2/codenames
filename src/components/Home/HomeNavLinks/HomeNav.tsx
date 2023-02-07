import React from 'react';
import HomeToPlayPop from './HowToPlayPop';
import Leaderboard from '../../Leaderboard/Leaderboard';
import { Link } from 'react-router-dom';
import './homeNav.css';
const HomeNav = () => {
  return (
    <div className="homeNav">
      <HomeToPlayPop />
      <Link to={'/leaderboard'}>
        <button>Leaderboard</button>
      </Link>
    </div>
  );
};

export default HomeNav;
