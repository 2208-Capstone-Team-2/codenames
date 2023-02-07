import React, { useEffect } from 'react';
// Component Imports:
import FAQ from './FAQ';
import HowToPlay from './HowToPlay';
import CreateRoomButton from './CreateRoomButton';
import SignInAnonymously from '../Room/SignInAnonymously';
// idk our static folder is so weird and I can't get the image to show
import HomeNav from './HomeNavLinks/HomeNav';
import './homepage.css';
import Footer from '../Footer/Footer';
function Home() {
  return (
    <div>
      <HomeNav />
      <div className="homeContainer">
        <div className="codenames">CODENAMES</div>
        <div className="loginContainer">
          <img src={'../../static/images/logoLight.png'} alt={''} width="50%" />
          <CreateRoomButton />
        </div>
        <SignInAnonymously />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
