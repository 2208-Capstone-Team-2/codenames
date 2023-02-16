import React, { useEffect } from 'react';
import CreateRoomButton from './CreateRoomButton';
import SignInAnonymously from '../FirebaseAuth/SignInAnonymously';
import HomeNav from './HomeNavLinks/HomeNav';
import './homepage.css';

function Home() {
  SignInAnonymously();
  return (
    <div>
      <HomeNav />
      <div className="homeContainer">
        <div className="codenames">CODENAMES</div>
        <CreateRoomButton />
      </div>
    </div>
  );
}

export default Home;
