import React from 'react';
// Component Imports:
import FAQ from './FAQ';
import HowToPlay from './HowToPlay';
import CreateRoomButton from './CreateRoomButton';
import SignInAnonymously from '../Room/SignInAnonymously';
// idk our static folder is so weird and I can't get the image to show
import './homepage.css';
function Home() {
  return (
    <div className="homeContainer">
      <div className="codenames">CODENAMES</div>
      <div className="loginContainer">
        <img src={'../../static/images/logoLight.png'} alt={''} width="50%" />
        <CreateRoomButton />
      </div>
      <HowToPlay />
      <FAQ />
      <SignInAnonymously />
    </div>
  );
}

export default Home;
