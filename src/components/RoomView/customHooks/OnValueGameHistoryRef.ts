import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
//firebase:
import { database } from '../../../utils/firebase';
import { onValue, ref } from 'firebase/database';
//redux:
import { useDispatch } from 'react-redux';
import { setGameHistory } from '../../../store/gameSlice';

function OnValueGameHistoryRef() {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const gameHistoryRef = ref(database, `rooms/${roomId}/game/history`);

  useEffect(() => {
    onValue(gameHistoryRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        let history = [];
        //this is to access the data under random firebase key and put them in an iterable array
        for (let historyKey in data) {
          history.push(data[historyKey]);
        }
        dispatch(setGameHistory(history));
      }
    });
  }, []);
}

export default OnValueGameHistoryRef;
