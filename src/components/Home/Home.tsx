import React, { useEffect } from 'react';
// Component Imports:
import CreateRoomButton from './CreateRoomButton';
import SignInAnonymously from '../Room/SignInAnonymously';
import HomeNav from './HomeNavLinks/HomeNav';
import './homepage.css';

function Home() {
  return (
    <div>
      <HomeNav />
      <div className="homeContainer">
        <div className="codenames">CODENAMES</div>
        <div className="loginContainer">
          <img className="logo" src="/images/logoCircle.png" alt="codenames" />
          <CreateRoomButton />
        </div>
        <SignInAnonymously />
      </div>
    </div>
  );
}

export default Home;
