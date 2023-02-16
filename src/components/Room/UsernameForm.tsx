/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// Firebase:
import { database } from '../../utils/firebase';
import { ref, update, set, child, onDisconnect, get } from 'firebase/database';
// Redux:
import { RootState } from '../../store'; // Used for TS
import { useDispatch, useSelector } from 'react-redux';
import { setUsername } from '../../store/playerSlice';
import { setHost } from '../../store/gameSlice';
import './userForm.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CustomLoader from '../CustomLoader/CustomLoader';
interface UsernameFormProps {
  handleClose: (bool: boolean) => void;
}
const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
});
function UsernameForm({ handleClose }: UsernameFormProps) {
  const dispatch = useDispatch();
  const { roomId } = useParams() as { roomId: string };

  const { playerId, username, isHost } = useSelector((state: RootState) => state.player);

  // If we have a username in redux slice, start it with that. else, start it with empty string.
  const [usernameSubmissionDone, setUsernameSubmissionDone] = useState<boolean>(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: username ? username : '',
    },
    validationSchema,
    onSubmit: async (values: { username: string }) => {
      const trimmedInputtedUsername: string = values.username.trim();
      // Update our player's model with this new username
      const bodyToSubmit: { username: string; roomId: string } = {
        username: trimmedInputtedUsername,
        roomId,
      };
      await axios.put(`/api/player/${playerId}`, bodyToSubmit);

      // Update redux
      dispatch(setUsername(trimmedInputtedUsername));

      // Update firebase
      //// Update the 'outer' player ref
      const playerRef = ref(database, `players/${playerId}`);
      update(playerRef, { username: trimmedInputtedUsername, roomId, id: playerId });

      //// Update the nested-in-room player
      const nestedPlayerRef = ref(database, `rooms/${roomId}/players/${playerId}`);
      const playersInRoomRef = ref(database, `rooms/${roomId}/players/`);
      //// If they're the host, put that info there too.

      const hostRef = ref(database, `rooms/${roomId}/host`);

      if (isHost) {
        console.log('is host hit');
        update(hostRef, { playerId, username: trimmedInputtedUsername });
        onDisconnect(hostRef).remove();
        dispatch(setHost({ playerId, username: trimmedInputtedUsername }));
        set(child(playersInRoomRef, playerId), { playerId, username: trimmedInputtedUsername, isHost: true });
      } else {
        set(child(playersInRoomRef, playerId), { playerId, username: trimmedInputtedUsername, isHost: false });
        // we need this here bc if the user joins after the host is set, they wont get an updated host in their redux
        get(hostRef).then((snapshot) => {
          if (snapshot.exists()) {
            let hostData = snapshot.val();
            dispatch(setHost(hostData));
          }
        });
      }

      //// Set what to do on disconnect from firebase:
      ////// When player DCs, remove the nestedPlayer (the one inside the room).
      onDisconnect(nestedPlayerRef).remove();

      //// remove the outer player ref
      onDisconnect(playerRef).remove();

      // Change the piece of state that hides this popup
      setUsernameSubmissionDone(true);
      handleClose(false);
    },
  });
  if (!playerId)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <p>Loading...</p>
        <CustomLoader classname="loaderSmall" colorPair="redBlue" />
      </div>
    );
  return (
    <div className="wrapper">
      {!usernameSubmissionDone && (
        <div className="popupContent">
          <p>Welcome, please enter a username...</p>
          <form onSubmit={formik.handleSubmit}>
            <input
              className={!formik.errors.username ? 'usernameInput' : 'errorUsernameInput'}
              name="username"
              type="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Username"
              autoFocus
            ></input>
            <p className="errorText">{formik.errors.username ? '*Username is required' : ' '}</p>
            <button type="submit">continue</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default UsernameForm;
