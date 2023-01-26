import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
// Firebase:
import { database, auth } from './utils/firebase';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
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
  const { playerId } = useSelector((state) => state.player);

  const fetchRoom = async () => {
    console.log('inside fetchroom, room created looks like: ');
    setLoading(true);
    try {
      const room = await axios.get(`/api/room/${roomName}`);
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
      .then(() => {})
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
          console.log('We found the player in the backend with your firebase uid!');
          console.log(foundPlayer);

          // dispatch to redux
          dispatch(setPlayerId(foundPlayer.data.id));
          dispatch(setUsername(foundPlayer.data.username));

          // Use the found player's username in the backend to pre-fill our form's text input
          setInputtedUsername(foundPlayer.data.username);
        } catch (err) {
          console.log('did not find player in the backend for this firebase uid');
          // if player doesn't exist in db... create one right now!
          const createdPlayer = await axios.post(`/api/player`, { playerId });

          // dispatch to redux
          dispatch(setPlayerId(createdPlayer.data.id));
          dispatch(setUsername(createdPlayer.data.username));
        }

        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  const submitHandler = async (e) => {
    // tie the player in our redux
    e.preventDefault();
    console.log('continue button clicked!');

    // Todo: Validation - may want to use formik/yup?
    // Make sure the username they gave isn't empty / made of only white spaces
    const trimmedInputtedUsername = inputtedUsername.trim();
    if (trimmedInputtedUsername === '') {
      // stop now! and display error. user needs to resubmit. - Or use formik/yup
    }

    // Update our player's model with this new username
    const bodyToSubmit = { username: trimmedInputtedUsername };
    const updatedPlayer = await axios.put(`/api/player/${playerId}`, bodyToSubmit);
    console.log('player in backend now looks like:');
    console.log(updatedPlayer.data);
    // Update the firebase player refs to have this username.
    // Todo!

    // dispatch to redux
    dispatch(setUsername(trimmedInputtedUsername));

    // Todo: something to trigger hiding this popup
  };
  const [inputtedUsername, setInputtedUsername] = useState('');

  // these are ugly and placeholder
  const popupStyles = {
    backgroundColor: 'yellow',
    border: '2px black dashed',
  };

  if (loading) return <p>loading...</p>;
  return (
    <div>
      {!playerId ? (
        <p>loading user form popup...</p>
      ) : (
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
      <p>Rest of room is here....</p>
    </div>
  );
}

export default SimpleRoom;
