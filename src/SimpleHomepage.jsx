import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SimpleHomepage() {
  const navigate = useNavigate();
  const clickHandler = async () => {
    // create room in backend

    const { data } = await axios.post(`/api/room/`);
    // set isHost!!!

    console.log(data);
    // inside this route , generate the randomWords
    // if a room with that name already exists, generative randomWords again and try that
    const roomName = data.name;
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
