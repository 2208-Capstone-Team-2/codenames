import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
//firebase:
import { database } from '../../../utils/firebase';
import { onValue, ref } from 'firebase/database';
//redux:
import { useDispatch, useSelector } from 'react-redux';
import { setHost } from '../../../store/gameSlice';
import { setIsHost } from '../../../store/playerSlice';
import { RootState } from '../../../store/index.js';

function OnValueHostRef() {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const { playerId } = useSelector((state: RootState) => state.player);
  const hostRef = ref(database, `rooms/${roomId}/host`);

  useEffect(() => {
    onValue(hostRef, (snapshot) => {
      if (snapshot.exists()) {
        const host = snapshot.val();
        if (host.playerId === playerId) {
          dispatch(setHost(host));
          dispatch(setIsHost(true));
        } else {
          dispatch(setHost(host));
          dispatch(setIsHost(false));
        }
      } else {
        dispatch(setHost(null));
        dispatch(setIsHost(false));
      }
    });
  }, [playerId]);
}

export default OnValueHostRef;
