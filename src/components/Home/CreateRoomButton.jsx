import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// redux imports:
import { useDispatch } from 'react-redux';
import { setIsHost } from '../../store/playerSlice';
import { setHost } from '../../store/gameSlice';
//firebase imports

import { database } from '../../utils/firebase';
import { ref, set } from 'firebase/database';

function CreateRoomButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clickHandler = async () => {
    // create room in backend
    const { data } = await axios.post(`/api/room/`);

    // get the roomName so we can navigate to that room's page.
    const roomId = data.name;

    // create room references on firebase
    const roomRef = ref(database, `rooms/${roomId}`);
    set(roomRef, {
      roomId, // i want to change this key to roomname
      game: {
        gameStatus: 'ready',
        team1RemainingCards: 9,
        team2RemainingCards: 8,
      },
    });

    // Since we are the ones that made the room, make us the host in our redux.
    dispatch(setIsHost(true));

    return navigate(`/room/${roomId}`);
  };

  return <button onClick={clickHandler}>Create Room</button>;
}

export default CreateRoomButton;
