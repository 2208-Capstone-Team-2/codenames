import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
//firebase:
import { database } from '../../../utils/firebase';
import { onChildChanged, onValue, ref } from 'firebase/database';
//redux:
import { useDispatch, useSelector } from 'react-redux';
import { setTeamIdOnPlayer } from '../../../store/playerSlice';
import { RootState } from '../../../store/index.js';

function OnChildChangedPlayerRef() {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const { playerId } = useSelector((state: RootState) => state.player);

  useEffect(() => {
    const nestedPlayerInRoomRef = ref(database, `rooms/${roomId}/players/${playerId}`);
    if (playerId) {
      onValue(nestedPlayerInRoomRef, async (snapshot) => {
        if (snapshot.exists()) {
          console.log(`playerId inside onChild: ${playerId}`);
          const teamIdFromFB = snapshot.val()?.teamId;
          if (teamIdFromFB) {
            console.log('setting team id as TEAMID');
            dispatch(setTeamIdOnPlayer(teamIdFromFB));
          } else {
            console.log('setting team id as null');
            dispatch(setTeamIdOnPlayer(null));
          }
        }
      });
    }
  }, [playerId]);

  // using on child:
  // useEffect(() => {
  //   const nestedPlayerInRoomRef = ref(database, `rooms/${roomId}/players/`);
  //   if (playerId) {
  //     onChildChanged(nestedPlayerInRoomRef, async (data) => {
  //       console.log(`playerId inside onChild: ${playerId}`);
  //       if (data.key === playerId) {
  //         if (data.val().teamId) {
  //           console.log('setting team id as TEAMID');
  //           dispatch(setTeamIdOnPlayer(data.val().teamId));
  //         } else {
  //           console.log('setting team id as null');
  //           dispatch(setTeamIdOnPlayer(null));
  //         }
  //       }
  //     });
  //   }
  // }, [playerId]);
}

export default OnChildChangedPlayerRef;
