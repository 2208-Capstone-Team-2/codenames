import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// redux imports:
import { useDispatch } from 'react-redux';
import { setIsHost } from '../../store/playerSlice';
// firebase imports
import { database } from '../../utils/firebase';
import { ref, set } from 'firebase/database';
import './homepage.css';
import CustomLoader from '../CustomLoader/CustomLoader';
function CreateRoomButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const clickHandler = async () => {
    setLoading(true); // Now loading, so show loader...

    // create room in backend
    const { data } = await axios.post(`/api/room/`);

    // get the roomName so we can navigate to that room's page.
    const roomId: string = data.name;

    // create room references on firebase
    const roomRef = ref(database, `rooms/${roomId}`);
    set(roomRef, {
      roomId,
      game: {
        gameStatus: 'ready',
        team1RemainingCards: 9,
        team2RemainingCards: 8,
      },
    });

    dispatch(setIsHost(true));
    setLoading(false); // Done! No longer 'loading'
    return navigate(`/room/${roomId}`);
  };

  if (loading) return <CustomLoader classname="loaderSmall" colorPair="redBlue" />;
  return (
    <button className="startGameBtn" onClick={clickHandler}>
      Create Room
    </button>
  );
}

export default CreateRoomButton;
