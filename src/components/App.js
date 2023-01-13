import { Button } from "@mui/material";
import React from "react";
import firebase from "firebase/auth";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import Login from "./Login";
import { database, app, auth, firebaseConfig } from "../utils/firebase";
import { setPlayerId } from "../store/playersSlice";
import { useDispatch, useSelector } from "react-redux";
const App = () => {
  let playerId = useSelector((state) => state.players.playerId);
  let playerRef;
  // let roomRef;
  // let players = {};
  // let playerElements = {};

  const dispatch = useDispatch();
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
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        // uid as 'playerId'
        const playerId = user.uid;
        dispatch(setPlayerId(playerId));
        // Returns a Reference to the location in the Database corresponding to the provided player
        playerRef = ref(database, "players/" + playerId);

        // set player in firebase db
        set(playerRef, { id: playerId });
      } else {
        // User is signed out
        console.log("signed out");
        playerRef.onDisconnect().remove();
      }
    });
  }, []);

  return (
    <div>
      <Login playerId={playerId} playerRef={playerRef} />
    </div>
  );
};

export default App;
