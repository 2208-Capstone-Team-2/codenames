import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// redux imports:
import { useDispatch } from 'react-redux';
import { setIsHost } from '../../store/playerSlice';
// firebase imports
import { database } from '../../utils/firebase';
import { ref, set } from 'firebase/database';

function CreateRoomButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clickHandler = async () => {
    // create room in backend
    const { data } = await axios.post(`/api/room/`);

    // get the roomName so we can navigate to that room's page.
    const roomId: string = data.name;

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

    dispatch(setIsHost(true));
    return navigate(`/room/${roomId}`);
  };

  return (
    <div className="createRoomBox">
      <img src="/images/logoCircle.png" alt="codenames" />
      <button onClick={clickHandler}>Create Room</button>
    </div>
  );
}

export default CreateRoomButton;
