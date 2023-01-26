import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsHost } from './store/playerSlice';

function SimpleHomepage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clickHandler = async () => {
    // create room in backend
    const { data } = await axios.post(`/api/room/`);

    // get the roomName so we can navigate to that room's page.
    const roomName = data.name;
    // *** TODO: create room on firebase here!

    // Since we are the ones that made the room, make us the host in our redux.
    dispatch(setIsHost(true));
    // *** TODO: create room's host iud entry on firebase here!

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
