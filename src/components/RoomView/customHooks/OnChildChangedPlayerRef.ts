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
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const { playerId } = useSelector((state: RootState) => state.player);
  let nestedPlayerInRoomRef = ref(database, `rooms/${roomId}/players/${playerId}`);

  useEffect(() => {
    onChildChanged(nestedPlayerInRoomRef, (data) => {
        // playerId still === '' at this point, so have to use auth? :/
        // even when listening for playerId changes...?
        if (data.key === auth.currentUser?.uid) {
            console.log('playerid', playerId)
          if (data.val().teamId) {
            console.log('setting team id as TEAMID')
            dispatch(setTeamIdOnPlayer(data.val().teamId))
          } else {
            console.log('setting team id as null')
            dispatch(setTeamIdOnPlayer(null))
          }
        } else {
          return
        }
      })

  }, [playerId]);
}

export default OnChildChangedPlayerRef;



