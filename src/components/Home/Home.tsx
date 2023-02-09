import React, { useEffect } from 'react';
// Component Imports:
import CreateRoomButton from './CreateRoomButton';
import SignInAnonymously from '../FirebaseAuth/SignInAnonymously';
import HomeNav from './HomeNavLinks/HomeNav';
import './homepage.css';
//idk our static folder is so weird and I can't get the image to show

function Home() {
  SignInAnonymously();
  return (
    <div>
      <HomeNav />
      <div className="homeContainer">
        <div className="codenames">CODENAMES</div>
        <div className="loginContainer">
          <img className="logo" src="/images/logoCircle.png" alt="codenames" />
          <CreateRoomButton />
        </div>
      </div>
    </div>
  );
}

export default Home;
