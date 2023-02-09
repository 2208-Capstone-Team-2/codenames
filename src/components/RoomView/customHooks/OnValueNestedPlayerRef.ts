import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
//firebase:
import { database } from '../../../utils/firebase';
import { onValue, ref } from 'firebase/database';
//redux:
import { useDispatch, useSelector } from 'react-redux';
import { setTeamIdOnPlayer } from '../../../store/playerSlice';
import { RootState } from '../../../store/index.js';

function OnValueNestedPlayerRef() {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const { playerId, teamId } = useSelector((state: RootState) => state.player);
  const nestedPlayerRef = ref(database, `rooms/${roomId}/players/${playerId}`);

  useEffect( () => {
    console.log('hitting use effect')
    onValue(nestedPlayerRef, (snapshot) => {
        console.log('hitting nested player')
        if (snapshot.exists()) {
          let teamIdFromFirebase = snapshot.val().teamId
          console.log({teamIdFromFirebase})
          dispatch(setTeamIdOnPlayer(teamIdFromFirebase))
        }
      });
  }, [teamId]);
}

export default OnValueNestedPlayerRef;



