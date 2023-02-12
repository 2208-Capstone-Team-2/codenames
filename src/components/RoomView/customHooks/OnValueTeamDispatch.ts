import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
//firebase:
import { database } from '../../../utils/firebase';
import { onValue, ref } from 'firebase/database';
//redux:
import { useDispatch, useSelector } from 'react-redux';
import { setTeamIdOnPlayer } from '../../../store/playerSlice';
import { RootState } from '../../../store/index.js';

function OnValueTeamDispatch() {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const { playerId } = useSelector((state: RootState) => state.player);

  useEffect(() => {
    const nestedPlayerInRoomRef = ref(database, `rooms/${roomId}/players/${playerId}`);
    if (playerId) {
      onValue(nestedPlayerInRoomRef, (snapshot) => {
        if (snapshot.exists()) {
          const teamIdFromFB = snapshot.val()?.teamId;
          if (teamIdFromFB) dispatch(setTeamIdOnPlayer(teamIdFromFB));
          else dispatch(setTeamIdOnPlayer(null));
        }
      });
    }
  }, [playerId]);
}

export default OnValueTeamDispatch;
