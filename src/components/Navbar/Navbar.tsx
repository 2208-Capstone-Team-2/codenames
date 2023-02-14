import React from 'react';
import './navbar.css';
import HowToPlayDrop from './HowToPlayDrop';
import AllPlayersDrop from './AllPlayersDrop';
import TimerNav from './TimerNav';
import WelcomeBoard from './WelcomeBoard';
import ResetsDrop from './ResetDrop';
const Navbar = () => {
  return (
    <div className="navbarContainer">
      <div className="navBarButtons">
        <AllPlayersDrop />
        <TimerNav />
      </div>
      <WelcomeBoard />
      <div className="resetAndHTPBtns">
        <ResetsDrop />
        <HowToPlayDrop />
      </div>
    </div>
  );
};

export default Navbar;
