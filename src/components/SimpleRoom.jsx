import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';

function SimpleRoom(props) {
  const { roomName } = useParams();

  // optimize if this is the person that just created the room??
  const [loading, setLoading] = useState(false);

  const fetchRoom = async () => {
    setLoading(true);

    const room = await axios.get(`/api/room/${roomName}`);
    // if we didn't find a room in the backend with this name, give them a 404

    setLoading(false);
    if (room.data.response === 404) return navigate('/404');
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
        const foundPlayer = await axios.get(`/api/players/${playerId}`)

        if (foundPlayer.data.response === 404) 
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);


  
  const newUserSubmission = () => {
    ///
  };

  const oldUserSubmission = () => {
    ///
  };

  if (loading) return <p>loading...</p>;
  return (
    <div>
      <div>
        <p>Welcome back {user.username}</p>
        <p>Do you want to change your name?</p>
        <input placeholder={user.username}></input>
        <button type="submit" onClick={oldUserSubmission}>
          continue
        </button>
      </div>

      <div>
        <p>Hi new user, enter a username</p>
        <input></input>
        <button type="submit" onClick={newUserSubmission}>
          continue
        </button>
      </div>
    </div>
  );
}

export default SimpleRoom;
