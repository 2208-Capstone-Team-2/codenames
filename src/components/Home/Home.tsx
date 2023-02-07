import React from 'react';
import styles from './Home.styles';
import '../RoomView/roomView.css';
// Component Imports:
import FAQ from './FAQ';
import HowToPlay from './HowToPlay';
import CreateRoomButton from './CreateRoomButton';
import SignInAnonymously from '../Room/SignInAnonymously';
import ClueTestingDesign from '../RoomView/ClueTestingDesign';
//idk our static folder is so weird and I can't get the image to show

function Home() {
  return (
    <div className="roomViewBG">
      <div style={styles.sx.HomeContainer}>
        <div style={styles.sx.LoginContainer}>
          <img src={'../../static/images/logoLight.png'} alt={''} width="50%" />
          <CreateRoomButton />
        </div>

        <HowToPlay />
        <ClueTestingDesign />
        <FAQ />
        <SignInAnonymously />
      </div>
    </div>
  );
}

export default Home;
