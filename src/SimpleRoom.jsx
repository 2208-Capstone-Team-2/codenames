import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

// Firebase:
import { database, auth } from './utils/firebase';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { ref, update, set, child, onDisconnect } from 'firebase/database';

// Redux:
import { useDispatch, useSelector } from 'react-redux';
import { setPlayerId, setRoomId, setUsername } from './store/playerSlice';
import { setTeam1Id } from './store/teamOneSlice';
import { setTeam2Id } from './store/teamTwoSlice';
import { setBystanderTeamId, setAssassinTeamId } from './store/assassinAndBystanderSlice';

function SimpleRoom() {
  // todo: optimize if this is the person that just created the room??

  const { roomName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { playerId, roomId, isHost } = useSelector((state) => state.player);

  const fetchRoom = async () => {
    console.log('inside fetchroom');
    setLoading(true);
    try {
      const room = await axios.get(`/api/room/${roomName}`);
      console.log(room);
      setLoading(false);

      // Now that we have room from backend, set all the redux pieces relevant to it.
      dispatch(setRoomId(room.data.name)); //***** i still want to change this to roomname and have it not live on player slice */
      dispatch(setTeam1Id(room.data.team1id));
      dispatch(setTeam2Id(room.data.team2id));
      dispatch(setBystanderTeamId(room.data.team3id));
      dispatch(setAssassinTeamId(room.data.team4id));
    } catch (err) {
      setLoading(false);
      // if we didn't find a room in the backend with this name, or something else went wrong,
      // give them a 404
      console.log(err);
      return navigate('/404');
    }
  };

  useEffect(() => {
    fetchRoom();
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
        // If for some reason we can't sign them in, navigate them to 404.
        console.log('signed out on signInAnon?!');
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
          console.log('We found the player in the backend with your firebase uid!');
          console.log(foundPlayer);
          player = foundPlayer.data;
          // Use the found player's username in the backend to pre-fill our form's text input
          setInputtedUsername(foundPlayer.data.username);
        } catch (err) {
          console.log('did not find player in the backend for this firebase uid');
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
        // The should never be signed out, let's just navigate to 404 if this happens.
        console.log('signed out from on authstate changes?!');
      }
    });
  }, []);

  const submitHandler = async (e) => {
    // tie the player in our redux
    e.preventDefault();
    console.log('Continue button clicked!');

    // Todo: Validation - may want to use formik/yup?
    // Make sure the username they gave isn't empty / made of only white spaces
    const trimmedInputtedUsername = inputtedUsername.trim();
    if (trimmedInputtedUsername === '') {
      // stop now! and display error. user needs to resubmit. - Or use formik/yup
    }
    console.log(roomId, playerId);
    // Update our player's model with this new username
    const bodyToSubmit = { username: trimmedInputtedUsername, roomName };
    const updatedPlayer = await axios.put(`/api/player/${playerId}`, bodyToSubmit);
    console.log('player in backend now looks like:');
    console.log(updatedPlayer.data);

    // Update redux
    dispatch(setUsername(trimmedInputtedUsername));

    // Update firebase
    //// Update the 'outer' player ref
    const playerRef = ref(database, `players/${playerId}`);
    update(playerRef, { username: trimmedInputtedUsername, roomId, id: playerId });

    //// Update the nested-in-room player
    const nestedPlayerRef = ref(database, `rooms/${roomId}/players/${playerId}`);
    update(nestedPlayerRef, { playerId, username: trimmedInputtedUsername });
    // other way of doing it:
    // let playersInRoomRef = ref(database, `rooms/${roomId}/players`);
    // set(child(playersInRoomRef, playerId), { playerId, username: trimmedInputtedUsername });

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

    // Todo: something to trigger hiding this popup
    setUsernameSubmissionDone(true);
  };
  const [inputtedUsername, setInputtedUsername] = useState('');
  const [usernameSubmissionDone, setUsernameSubmissionDone] = useState(false);
  // these are ugly and placeholder
  const popupStyles = {
    backgroundColor: 'yellow',
    border: '2px black dashed',
  };

  console.log('inside simple room!');
  if (loading) return <p>loading...</p>;
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
