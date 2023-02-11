import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
//firebase:
import { database, auth } from '../../../utils/firebase';
import { onChildChanged, ref } from 'firebase/database';
//redux:
import { useDispatch, useSelector } from 'react-redux';
import { setTeamIdOnPlayer } from '../../../store/playerSlice';
import { RootState } from '../../../store/index.js';

function OnChildChangedPlayerRef() {
  console.log('custom hook!');
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const { playerId } = useSelector((state: RootState) => state.player);

  useEffect(() => {
    const nestedPlayerInRoomRef = ref(database, `rooms/${roomId}/players/`);
    if (playerId) {
      onChildChanged(nestedPlayerInRoomRef, async (data) => {
        console.log(`playerId inside onChild: ${playerId}`);
        // playerId still === '' at this point, so have to use auth? :/
        // even when listening for playerId changes...?
        if (data.key === playerId) {
          if (data.val().teamId) {
            console.log('setting team id as TEAMID');
            dispatch(setTeamIdOnPlayer(data.val().teamId));
          } else {
            console.log('setting team id as null');
            dispatch(setTeamIdOnPlayer(null));
          }
        }
      });
    }
  }, [playerId]);
}

export default OnChildChangedPlayerRef;
