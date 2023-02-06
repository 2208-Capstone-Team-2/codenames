import React, { useEffect, useState } from 'react';
import Popup from './Popup';
// Component Imports:
import UsernameForm from './UsernameForm';
import ResponsiveAppBar from '../ResponsiveAppBar';
import RoomView from '../RoomView/RoomView';
import FetchRoom from './FetchRoom';
import SignInAnonymously from './SignInAnonymously';
import OnAuthStateChanged from './OnAuthStateChanged';
import './userForm.css';
import Navbar from '../Navbar/Navbar';
import DocumentTitleChange from './DocumentTitleChange';

function RoomContainer() {
  const [inputtedUsername, setInputtedUsername] = useState<string>('');
  const [timedPopup, setTimedPopup] = useState<boolean>(false);
  const [canBeClosed, setCanBeClosed] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setTimedPopup(true);
    }, 1000);
  }, []);

  DocumentTitleChange();
  return (
    <div>
      <Navbar />
      <FetchRoom />
      <SignInAnonymously />
      <OnAuthStateChanged setInputtedUsername={setInputtedUsername} />
      <Popup trigger={timedPopup} setTrigger={setTimedPopup}>
        <UsernameForm
          inputtedUsername={inputtedUsername}
          setInputtedUsername={setInputtedUsername}
          canBeClosed={canBeClosed}
          setCanBeClosed={setCanBeClosed}
        />
      </Popup>
      <RoomView className={timedPopup ? 'disabled' : ''} />
    </div>
  );
}

export default RoomContainer;
