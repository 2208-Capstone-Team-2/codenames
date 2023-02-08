/* eslint-disable react/prop-types */

import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Player } from '../Leaderboard/leaderboard.types';

// Redux:
import { useDispatch, useSelector } from 'react-redux';
import { setIsSpectator, setPlayerId, setUsername } from '../../store/playerSlice';
import { RootState } from '../../store';

// Firebase:
import { auth, database } from '../../utils/firebase';
import { ref, set } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';

interface WrapperProps {
  setInputtedUsername: Function;
}

function OnAuthStateChanged({ setInputtedUsername }: WrapperProps) {
  const dispatch = useDispatch();
  const { isHost } = useSelector((state: RootState) => state.player);
  const { roomId } = useParams();

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
        if (player) {
          dispatch(setPlayerId(player.id));
          dispatch(setUsername(player.username));
          dispatch(setIsSpectator(player.isSpectator));

          // Look to see if they are host (if redux's isHost is true)
          if (isHost) {
            let hostRef = ref(database, `rooms/${roomId}/host`);
            // setting host here triggers hostRef in roomview and sets redux stores accordingly
            set(hostRef, { playerId });
          }
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
