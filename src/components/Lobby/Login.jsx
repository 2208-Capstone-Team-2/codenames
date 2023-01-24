import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//mui imports:
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
//firebase:
import { database, auth } from '../../utils/firebase';
import { ref, update, set, onDisconnect } from 'firebase/database';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { setRoomName } from '../../store/gameSlice';
import { setUsername, setPlayerId } from '../../store/playerSlice';
// css and other components
import styles from './Lobby.styles';
import logo from '../../static/images/logoLight.png'; // Tell Webpack this JS file uses this image
import HowToPlay from './HowToPlay.jsx';
import FAQ from './FAQ.jsx';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Redux
  const { roomName } = useSelector((state) => state.game);
  const { username } = useSelector((state) => state.player);
  let playerId = useSelector((state) => state.player.playerId);
  // Firebase
  let playerRef = ref(database, 'players/' + playerId);

  // setting user room and name on frontend
  const handleRoom = (event) => {
    dispatch(setRoomName(event.target.value));
  };
  const handleName = (event) => {
    dispatch(setUsername(event.target.value));
  };

  const playerLogin = (e) => {
    e.preventDefault();

    // axios post request to create player

    // update player with name and room id
    update(playerRef, { id: playerId, username, roomName });
    // room will be updated with player on 'roomview' component
    navigate(`/room/${roomName}`);
  };

  useEffect(() => {
    signInAnonymously(auth)
      .then(() => {
        // Signed in..
        // **** THIS MIGHT be where we create a Player Model? **** /
      })
      .catch((error) => {
        // eslint-disable-next-line no-unused-vars
        const errorCode = error.code;
        // eslint-disable-next-line no-unused-vars
        const errorMessage = error.message;
      });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // uid as 'playerId'
        const playerId = user.uid;
        dispatch(setPlayerId(playerId));
        // Returns a Reference to the location in the Database corresponding to the provided player
        playerRef = ref(database, 'players/' + playerId);

        // set player in firebase db
        set(playerRef, { id: playerId });

        // When I disconnect, remove me from firebase/players
        onDisconnect(playerRef).remove();
      } else {
        // User is signed out
      }
    });
  }, []);

  return (
    <div style={styles.sx.HomeContainer}>
      <div style={styles.sx.LoginContainer}>
        <img src={logo} alt={''} width="50%" />
        <form onSubmit={playerLogin} style={styles.sx.FormContainer}>
          <TextField
            id="outlined-basic"
            label="username"
            variant="outlined"
            placeholder="username"
            onChange={handleName}
          />
          <TextField
            id="outlined-basic"
            label="room name"
            variant="outlined"
            placeholder="room name"
            onChange={handleRoom}
          />
          <Button type="submit" variant="contained">
            Join Room
          </Button>
        </form>
      </div>
      <HowToPlay />
      <FAQ />
    </div>
  );
};

export default Login;
