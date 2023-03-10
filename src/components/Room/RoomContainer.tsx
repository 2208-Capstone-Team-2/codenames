import React, { useEffect, useState } from 'react';
// Component Imports:
import Popup from './Popup';
import UsernameForm from './UsernameForm';
import RoomView from '../RoomView/RoomView';
import FetchRoom from './FetchRoom';
import SignInAnonymously from '../FirebaseAuth/SignInAnonymously';
import OnAuthStateChanged from '../FirebaseAuth/OnAuthStateChanged';
import DocumentTitleChange from './DocumentTitleChange';
import './userForm.css';
import UsernameModal from '../RoomView/UsernameModal/UsernameModal';

function RoomContainer() {
  const [timedPopup, setTimedPopup] = useState<boolean>(true);
  const [canBeClosed, setCanBeClosed] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setTimedPopup(true);
    }, 1000);
  }, []);

  // Run custom hooks
  const isSignedIn = SignInAnonymously();
  DocumentTitleChange();
  OnAuthStateChanged();

  return (
    <div>
      <FetchRoom />
      <UsernameModal />
      <RoomView />
    </div>
  );
}

export default RoomContainer;
