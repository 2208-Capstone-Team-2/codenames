/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// Firebase:
import { database } from '../../utils/firebase';
import { ref, update, set, child, onDisconnect, get } from 'firebase/database';
// Redux:
import { RootState } from '../../store'; // Used for TS
import { useDispatch, useSelector } from 'react-redux';
import { setUsername } from '../../store/playerSlice';
import { setHost } from '../../store/gameSlice';
import './userForm.css';

interface UsernameFormProps {
  handleClose: Function;
}

function UsernameForm({ handleClose }: UsernameFormProps) {
  const dispatch = useDispatch();
  const { roomId } = useParams() as { roomId: string };

  const { playerId, username, isHost } = useSelector((state: RootState) => state.player);

  // If we have a username in redux slice, start it with that. else, start it with empty string.
  const [inputtedUsername, setInputtedUsername] = useState<string>(username ? username : '');
  const [usernameSubmissionDone, setUsernameSubmissionDone] = useState<boolean>(false);

  const submitHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // TODO: Validation - may want to use formik/yup?
    // Make sure the username they gave isn't empty / made of only white spaces
    const trimmedInputtedUsername: string = inputtedUsername.trim();
    if (trimmedInputtedUsername === '') {
      console.log('cannot have empty username');
      // stop now! and display error. user needs to resubmit. - Or use formik/yup
    } else {
      // Update our player's model with this new username
      const bodyToSubmit: { username: string; roomId: string } = {
        username: trimmedInputtedUsername,
        roomId,
      };
      await axios.put(`/api/player/${playerId}`, bodyToSubmit);

      // Update redux
      dispatch(setUsername(trimmedInputtedUsername));

      // Update firebase
      //// Update the 'outer' player ref
      const playerRef = ref(database, `players/${playerId}`);
      update(playerRef, { username: trimmedInputtedUsername, roomId, id: playerId });

      //// Update the nested-in-room player
      const nestedPlayerRef = ref(database, `rooms/${roomId}/players/${playerId}`);
      const playersInRoomRef = ref(database, `rooms/${roomId}/players/`);
      //// If they're the host, put that info there too.

      const hostRef = ref(database, `rooms/${roomId}/host`);

      if (isHost) {
        console.log('is host hit');
        update(hostRef, { playerId, username: trimmedInputtedUsername });
        onDisconnect(hostRef).remove();
        dispatch(setHost({ playerId, username: trimmedInputtedUsername }));
        set(child(playersInRoomRef, playerId), { playerId, username: trimmedInputtedUsername, isHost: true });
      } else {
        set(child(playersInRoomRef, playerId), { playerId, username: trimmedInputtedUsername, isHost: false });
        // we need this here bc if the user joins after the host is set, they wont get an updated host in their redux
        get(hostRef).then((snapshot) => {
          if (snapshot.exists()) {
            let hostData = snapshot.val();
            dispatch(setHost(hostData));
          }
        });
      }

      //// Set what to do on disconnect from firebase:
      ////// When player DCs, remove the nestedPlayer (the one inside the room).
      onDisconnect(nestedPlayerRef).remove();

      //// remove the outer player ref
      onDisconnect(playerRef).remove();

      // Change the piece of state that hides this popup
      setUsernameSubmissionDone(true);
      handleClose(false);
    }
  };
  if (!playerId) return <p>loading user form popup...</p>;
  return (
    <div className="wrapper">
      {!usernameSubmissionDone && (
        <div className="popupContent">
          <p>Welcome to room {roomId} !</p>
          <p>Enter a username...</p>
          <form>
            <input
              value={inputtedUsername}
              onChange={(event) => {
                setInputtedUsername(event.target.value);
              }}
              placeholder="username"
              autoFocus
            ></input>
            <button type="submit" onClick={submitHandler}>
              continue
            </button>
          </form>
        </div>
      )}
      {usernameSubmissionDone && <div className="popupContent">Welcome, {inputtedUsername}</div>}
    </div>
  );
}

export default UsernameForm;
