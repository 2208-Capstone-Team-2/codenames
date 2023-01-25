import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { database, auth } from './utils/firebase';

import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayerId, setRoomId, setUsername, isHost } from './store/playerSlice';

function SimpleRoom() {
  // optimize if this is the person that just created the room??

  const { roomName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { playerId, username } = useSelector((state) => state.player);

  const fetchRoom = async () => {
    console.log('inside fetchroom)');
    setLoading(true);
    try {
      const room = await axios.get(`/api/room/${roomName}`);
      console.log(room);
      setLoading(false);
      // set room redux
      dispatch(setRoomId(room.data.name));
    } catch (err) {
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

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const playerId = user.uid;
        // query backend player model to see if one exists with this uid
        const foundPlayer = await axios.get(`/api/players/${playerId}`);
        console.log('foundplayer:');
        console.log(foundPlayer);

        // if player doesn't exist in db...
        if (foundPlayer.status === 404) {
          // create one right now!
          const createdPlayer = await axios.post(`/api/player`, { id: playerId });

          // dispatch this info!
          dispatch(setPlayerId(createdPlayer.data.id));
          dispatch(setUsername(createdPlayer.data.username));
        } else {
          // if they do exist in our db already, just load that into into our redux.
          dispatch(setPlayerId(foundPlayer.data.id));
          dispatch(setUsername(foundPlayer.data.username));
        }

        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  const submitHandler = (e) => {
    // tie the player in our redux
    e.preventDefault();
    console.log('continue button clicked!');
  };
  console.log(playerId);
  const [inputtedUsername, setInputtedUsername] = useState('');
  if (loading) return <p>loading...</p>;
  return (
    <div>
      {!playerId ? (
        <p>loading user form popup...</p>
      ) : (
        <div className="username-form-popup">
          <p>Welcome to the room!</p>
          <p>Enter a username...</p>
          <form>
            <input
              value={inputtedUsername}
              onChange={(event) => {
                setInputtedUsername(event.target.value);
              }}
              placeholder={username ? username : ''}
            ></input>
            <button type="submit" onClick={submitHandler}>
              continue
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default SimpleRoom;
