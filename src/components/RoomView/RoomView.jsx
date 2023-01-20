
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRoomId, setIsHost } from '../../store/playerSlice';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { onValue, ref, set, get, child, onDisconnect } from 'firebase/database';
import { database } from '../../utils/firebase';
import { setAllPlayers } from '../../store/allPlayersSlice';
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Popup from 'reactjs-popup';

import styles from './Room.styles';
import SetupGame from './setupGame.jsx';
import ResponsiveAppBar from '../ResponsiveAppBar.jsx';
import Board from './Board.jsx';
import TeamOneBox from '../teamBoxes/TeamOneBox';
import TeamTwoBox from '../teamBoxes/TeamTwoBox';


const RoomView = () => {
  // for room nav
  const params = useParams('');
  const roomIdFromParams = params.id;
  setRoomId(roomIdFromParams);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // frontend state
  const { playerId, username, roomId, isHost } = useSelector((state) => state.player);
  const { allPlayers } = useSelector((state) => state.allPlayers);

  // firebase room  & players reference

  let roomRef = ref(database, 'rooms/' + roomId);
  let playersInRoomRef = ref(database, 'rooms/' + roomId + '/players/');
  let playerNestedInRoomRef = ref(database, 'rooms/' + roomId + '/players/' + playerId);

  useEffect(() => {
    // on loading page if no room or name, send back to join page
    if (roomId === '' || username === '') {
      navigate('/');
      return; // immediately kick them!
    }

    //when a user joins room, this checks to see if it exists
    get(roomRef).then((snapshot) => {
      const doesRoomExist = snapshot.exists();
      if (doesRoomExist) {
        // playerId is key in the room/roomId/players/playerId, so we creating new player obj
        set(child(playersInRoomRef, playerId), { playerId, username });
      } else {
        console.log('room does not exist...yet! Creating it now...');
        // create the room, (nested) players, and host.
        set(roomRef, {
          roomId: roomId,
          host: { playerId, username },
          players: { [playerId]: { playerId, username } },
        });
        // Set our state for if the player is the host or not.
        dispatch(setIsHost(true));
      }
    });

    // whenever users are added to specific room, update frontend redux store
    onValue(playersInRoomRef, (snapshot) => {
      if (snapshot.exists()) {
        const players = snapshot.val();
        const values = Object.values(players);
        dispatch(setAllPlayers(values));
      } else {
        console.log('no players in room yet!');
      }
    });

    // if the player disconnects, remove them from the room
    onValue(playerNestedInRoomRef, (snapshot) => {
      if (snapshot.exists()) {
        onDisconnect(playerNestedInRoomRef).remove(playersInRoomRef + '/' + playerId);
      }
    });
  }, []);
  //check to see if there are words to set up gameboard
  useEffect(() => {
    onValue(gameboardRef, (snapshot) => {
      if (snapshot.exists()) {
        const gameboard = snapshot.val();
        const values = Object.values(gameboard);
        console.log(gameboard);
        dispatch(setWordsInGame(values));
        console.log("new words in game");
      } else {
        console.log("no words yet");
      }
    });
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <ResponsiveAppBar />
      <Container style={styles.sx.RoomContainer}>
        <Grid container spacing={2} style={styles.sx.RoomGrid}>
          <Grid item xs={12} style={styles.sx.RoomAndPlayers}>
            <Item style={styles.sx.PlayerContainer}>Room id: {roomId}</Item>
            <Item style={styles.sx.PlayerContainer}>
              Players:
              {allPlayers?.map((player) => (
                <p key={player.playerId}>{player.username}</p>
              ))}
            </Item>
          </Grid>
          <Grid item xs={3} md={4} zeroMinWidth>
            <TeamOneBox />
          </Grid>
          <Grid item xs={3} md={3} zeroMinWidth>
            <Item>Game History</Item>
          </Grid>
          <Grid item xs={3} md={4} zeroMinWidth>
            <TeamTwoBox />
          </Grid>

          <Grid item xs={8} md={10} style={styles.sx.BoardGrid} zeroMinWidth>
            <Item>Board</Item>
          </Grid>
        </Grid>
      </Container>

      {isHost && (
        <Popup
          trigger={
            <button
              style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Set Up
            </button>
          }
        >
          <SetupGame />
        </Popup>
      )}
      <Board />
    </>
  );
};

export default RoomView;
