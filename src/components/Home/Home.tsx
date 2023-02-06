import React from 'react';
import styles from './Home.styles';

// Component Imports:
import FAQ from './FAQ';
import HowToPlay from './HowToPlay';
import CreateRoomButton from './CreateRoomButton';
//idk our static folder is so weird and I can't get the image to show
function Home() {
  return (
    <div style={styles.sx.HomeContainer}>
      <div style={styles.sx.LoginContainer}>
        <img src={'../../static/images/logoLight.png'} alt={''} width="50%" />
        <CreateRoomButton />
      </div>
      <HowToPlay />
      <FAQ />
    </div>
  );
}

export default Home;
