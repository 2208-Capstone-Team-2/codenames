import React, { useEffect } from 'react';
import CreateRoomButton from './CreateRoomButton';
import SignInAnonymously from '../FirebaseAuth/SignInAnonymously';
import HomeNav from './HomeNavLinks/HomeNav';
import './homepage.css';
import ClueTestingDesign from '../RoomView/clue/ClueTestingDesign';

//idk our static folder is so weird and I can't get the image to show

function Home() {
  SignInAnonymously();
  return (
    <div className="realHomeContainer">
      <HomeNav />
      <div className="homeContainer">
        <div className="codenames">CODENAMES</div>
        <div className="loginContainer">
          <img className="logo" src="/images/logoCircle.png" alt="codenames" />
          <CreateRoomButton />
        </div>
        {/* <ClueTestingDesign /> */}
      </div>
    </div>
  );
}

export default Home;
