import React from 'react';
import styles from './Home.styles';
import logo from '../../static/images/logoLight.png'; // Tell Webpack this JS file uses this image

// Component Imports:
import FAQ from './FAQ';
import HowToPlay from './HowToPlay';
import CreateRoomButton from './CreateRoomButton';

function Home() {
  return (
    <div style={styles.sx.HomeContainer}>
      <div style={styles.sx.LoginContainer}>
        <img src={logo} alt={''} width="50%" />
        <CreateRoomButton />
      </div>
      <HowToPlay />
      <FAQ />
    </div>
  );
}

export default Home;
