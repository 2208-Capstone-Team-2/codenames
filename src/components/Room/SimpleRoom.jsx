import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';

// Firebase:
import { database, auth } from '../../utils/firebase';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { ref, update, set, child, onDisconnect } from 'firebase/database';

// Redux:
import { useDispatch, useSelector } from 'react-redux';
import { setPlayerId, setUsername } from '../../store/playerSlice';

function SimpleRoom() {
  // todo: optimize if this is the person that just created the room??
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const { playerId, isHost } = useSelector((state) => state.player);

  useEffect(() => {
    // at this point we need to sign them in anonymously to get their browser's uid
    signInAnonymously(auth)
      .then(() => {
        // ******* set ondisconnect rules here?
      })
      .catch((error) => {
        // eslint-disable-next-line no-unused-vars
        const errorCode = error.code;
        // eslint-disable-next-line no-unused-vars
        const errorMessage = error.message;
      });
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const playerId = user.uid;
        let player = null;

        try {
          // query backend player model to see if one exists with this uid
          const foundPlayer = await axios.get(`/api/player/${playerId}`);
          player = foundPlayer.data;
          // Use the found player's username in the backend to pre-fill our form's text input
          setInputtedUsername(foundPlayer.data.username);
        } catch (err) {
          // if player doesn't exist in db... create one right now!
          const createdPlayer = await axios.post(`/api/player`, { playerId });
          player = createdPlayer.data;
        }

        // Update redux:
        dispatch(setPlayerId(player.id));
        dispatch(setUsername(player.username));

        // Update firebase:
        // This will come once they submit their username!
      } else {
        // User is signed out
      }
    });
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    // TODO: Validation - may want to use formik/yup?
    // Make sure the username they gave isn't empty / made of only white spaces
    const trimmedInputtedUsername = inputtedUsername.trim();
    if (trimmedInputtedUsername === '') {
      // stop now! and display error. user needs to resubmit. - Or use formik/yup
    }
    // Update our player's model with this new username
    const bodyToSubmit = { username: trimmedInputtedUsername, roomId };
    await axios.put(`/api/player/${playerId}`, bodyToSubmit);

    // Update redux
    dispatch(setUsername(trimmedInputtedUsername));

    // Update firebase
    //// Update the 'outer' player ref
    const playerRef = ref(database, `players/${playerId}`);
    update(playerRef, { username: trimmedInputtedUsername, roomId, id: playerId });

    //// Update the nested-in-room player
    const nestedPlayerRef = ref(database, `rooms/${roomId}/players/${playerId}`);
    // update(nestedPlayerRef, { playerId, username: trimmedInputtedUsername });
    // other way of doing it:
    const playersInRoomRef = ref(database, `rooms/${roomId}/players/`);
    set(child(playersInRoomRef, playerId), { playerId, username: trimmedInputtedUsername });

    //// If they're the host, put that info there too.
    if (isHost) {
      let hostRef = ref(database, `rooms/${roomId}/host`);
      set(hostRef, { playerId, username: trimmedInputtedUsername });
    }

    //// Set what to do on disconnect from firebase:
    ////// When player DCs, remove the nestedPlayer (the one inside the room).
    onDisconnect(nestedPlayerRef).remove();

    //// remove the outer player ref
    onDisconnect(playerRef).remove();

    // Change the piece of state that hides this popup
    setUsernameSubmissionDone(true);
  };
  const [inputtedUsername, setInputtedUsername] = useState('');
  const [usernameSubmissionDone, setUsernameSubmissionDone] = useState(false);
  // these are ugly and placeholder
  const popupStyles = {
    backgroundColor: 'yellow',
    border: '2px black dashed',
  };

  return (
    <div>
      {!playerId ? (
        <p>loading user form popup...</p>
      ) : (
        <div>
          {!usernameSubmissionDone && (
            <div className="username-form-popup" style={popupStyles}>
              <p>Welcome to the room!</p>
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
        </div>
      )}
      <p>Rest of room is here....</p>
    </div>
  );
}

export default SimpleRoom;
