import React, { useEffect } from 'react';
import CreateRoomButton from './CreateRoomButton';
import SignInAnonymously from '../FirebaseAuth/SignInAnonymously';
import HomeNav from './HomeNavLinks/HomeNav';
import './homepage.css';
import ClueTestingDesign from '../RoomView/clue/ClueTestingDesign';
import CustomLoader from '../CustomLoader/CustomLoader';

//idk our static folder is so weird and I can't get the image to show

function Home() {
  SignInAnonymously();
  return (
    <div>
      <HomeNav />
      <div className="homeContainer">
        <div className="codenames">CODENAMES</div>
        <CreateRoomButton />
        <CustomLoader classname="loaderSmall" colorPair="greyBeige" />
        <CustomLoader classname="loaderSmall" colorPair="redBlue" />
      </div>
    </div>
  );
}

export default Home;
