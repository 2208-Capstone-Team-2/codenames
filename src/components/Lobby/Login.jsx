import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUsername, setRoomId } from "../../store/playerSlice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { database, auth } from "../../utils/firebase";
import { useEffect } from "react";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { setPlayerId } from "../../store/playerSlice";
import styles from "./Lobby.styles";
import logo from "../../static/images/logoLight.png"; // Tell Webpack this JS file uses this image
import HowToPlay from "./HowToPlay.jsx";
import FAQ from "./FAQ.jsx";
import { ref, update, set, onDisconnect } from "firebase/database";

const Login = () => {
  const navigate = useNavigate();
  const roomId = useSelector((state) => state.player.roomId);
  const username = useSelector((state) => state.player.username);
  const dispatch = useDispatch();
  let playerId = useSelector((state) => state.player.playerId);
  let playerRef;
  let roomRef;
 
  // references to firebase data
  playerRef = ref(database, "players/" + playerId);
  roomRef = ref(database, "rooms/" + roomId);
  // setting user room and name on frontend
  const handleRoom = (event) => {
    dispatch(setRoomId(event.target.value));
  };
  const handleName = (event) => {
    dispatch(setUsername(event.target.value));
  };

  const playerLogin = (e) => {
    // update player with name and room id
    update(playerRef, {id: playerId, username, roomId })
    // room will be updated with player on 'roomview' component
    navigate(`/room/${roomId}`);
  };

  useEffect(() => {
    signInAnonymously(auth)
      .then(() => {
        // Signed in..
        console.log(auth);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // uid as 'playerId'
        const playerId = user.uid;
        dispatch(setPlayerId(playerId));
        // Returns a Reference to the location in the Database corresponding to the provided player
        playerRef = ref(database, "players/" + playerId);

        // set player in firebase db
        set(playerRef, { id: playerId });
        onDisconnect(playerRef).remove();
      } else {
        // User is signed out
        console.log("signed out");
        // playerRef.onDisconnect().remove();

      }
    });
  }, []);

  return (
    <div style={styles.sx.HomeContainer}>
      <div style={styles.sx.LoginContainer}>
        <img src={logo} alt={""} width="50%" />
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
            label="room id"
            variant="outlined"
            placeholder="room number"
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
