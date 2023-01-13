import { Button } from "@mui/material";
import React from "react";
import firebase from "firebase/auth";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgwmE6Cs0gGyCrdWbCNiCJBzqWk2C0Cmo",
  authDomain: "codenames-15627.firebaseapp.com",
  databaseURL: "https://codenames-15627-default-rtdb.firebaseio.com",
  projectId: "codenames-15627",
  storageBucket: "codenames-15627.appspot.com",
  messagingSenderId: "83297844882",
  appId: "1:83297844882:web:2fe2658e9e0b4b83c3304b",
  measurementId: "G-9YXEWYWX70",
};

// Initialize Firebase

/**
 * This is the entry point for all of our react stuff
 */
const App = () => {
  let playerId;
  let playerRef;
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const database = getDatabase(app);

  // let players = {};
  // let playerElements = {};

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
      <h1>Welcome to dsfghjkl, Good luck!</h1>
      <Button variant="contained">Hello World</Button>
    </div>
  );
};

export default App;
