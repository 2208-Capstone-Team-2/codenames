import React from 'react';
import styles from '../Lobby/Lobby.styles';
import logo from '../../static/images/logoLight.png'; // Tell Webpack this JS file uses this image

// Component Imports:
import FAQ from '../Lobby/FAQ';
import HowToPlay from '../Lobby/HowToPlay';
import CreateRoomButton from './CreateRoomButton';

function SimpleHomepage() {
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

export default SimpleHomepage;
