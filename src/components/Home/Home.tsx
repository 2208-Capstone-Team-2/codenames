import React, { useEffect } from 'react';
import CreateRoomButton from './CreateRoomButton';
import SignInAnonymously from '../FirebaseAuth/SignInAnonymously';
import HomeNav from './HomeNavLinks/HomeNav';
import './homepage.css';
import Footer from '../Footer/Footer';

//idk our static folder is so weird and I can't get the image to show

function Home() {
  SignInAnonymously();
  return (
    <div className="homeGrid">
      <HomeNav />
      <div className="homeGrid2ndRow">
        <div className="codenames">CODENAMES</div>
        <CreateRoomButton />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
