import React from 'react';

function SimpleLogin(props) {
  const clickHandler = async () => {
    // create room in backend

    const { data } = await axios.post(`/api/room/`);
    // inside this route , generate the randomWords
    // if a room with that name already exists, generative randomWords again and try that
    const roomName = data.roomName;
    return navigate(`/room/${roomName}`);
  };

  return (
    <div>
      Welcome!
      <button onClick={clickHandler}>Create Room</button>
    </div>
  );
}

export default SimpleLogin;
