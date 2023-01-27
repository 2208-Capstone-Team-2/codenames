import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// redux imports:
import { useDispatch } from 'react-redux';
import { setIsHost } from './store/playerSlice';
//firebase imports
import { database } from './utils/firebase';
import { ref, set } from 'firebase/database';

function SimpleHomepage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let roomRef;
  const clickHandler = async () => {
    // create room in backend
    const { data } = await axios.post(`/api/room/`);

    // get the roomName so we can navigate to that room's page.
    const roomName = data.name;

    const roomRef = ref(database, `rooms/${roomName}`);
    // create room references on firebase
    set(roomRef, {
      roomId: roomName, // i want to change this key to roomname
      // can't set host yet because player not yet created/looked for
      // can't set players yet for same reason as above
      game: {
        gameStatus: 'ready',
        team1RemainingCards: 9,
        team2RemainingCards: 8,
      },
    });

    // Since we are the ones that made the room, make us the host in our redux.
    dispatch(setIsHost(true));

    return navigate(`/room/${roomName}`);
  };

  return (
    <div>
      Welcome!
      <button onClick={clickHandler}>Create Room</button>
    </div>
  );
}

export default SimpleHomepage;
