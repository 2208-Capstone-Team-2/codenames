/* eslint-disable react/prop-types */

import React, { useEffect } from 'react';
import axios from 'axios';
// Redux:
import { useDispatch } from 'react-redux';

// Firebase:
import { auth } from '../../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setPlayerId, setUsername } from '../../store/playerSlice';
import { Player } from '../Leaderboard/leaderboard.types';

interface WrapperProps {
  setInputtedUsername: Function;
}

function OnAuthStateChanged({ setInputtedUsername }: WrapperProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const playerId = user.uid;
        let player: Player | null = null;

        try {
          // query backend player model to see if one exists with this uid
          const foundPlayer = await axios.get(`/api/player/${playerId}`);
          player = foundPlayer.data;
          // Use the found player's username in the backend to pre-fill our form's text input
          setInputtedUsername(foundPlayer.data.username);
        } catch (err) {
          // if player doesn't exist in db... create one right now!
          const createdPlayer = await axios.post(`/api/player`, { playerId });
          player = createdPlayer.data;
        }

        // Update redux:
        if(player){
          dispatch(setPlayerId(player.id));
          dispatch(setUsername(player.username));
        }

        // Update firebase:
        // This will come once they submit their username!
      } else {
        // User is signed out
      }
    });
  }, []);

  return <></>;
}

export default OnAuthStateChanged;
