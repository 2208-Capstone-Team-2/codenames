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
import SetupGame from './setupGame.jsx';
import { setWordsInGame } from '../../store/wordsInGameSlice';
import styles from './Room.styles';
import ResponsiveAppBar from '../ResponsiveAppBar.jsx';
import { setTeam1RemainingCards, setTeam2RemainingCards, setStatus } from '../../store/gameSlice';
import OperativeBoard from './OperativeBoard.jsx';
import SpyMasterBoard from './SpyMasterBoard';
import TeamOneBox from '../teamBoxes/TeamOneBox';
import TeamTwoBox from '../teamBoxes/TeamTwoBox';
import { Button } from '@mui/material';

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
  const { teamOneOperatives, teamOneSpymaster } = useSelector((state) => state.teamOne);
  const { teamTwoOperatives, teamTwoSpymaster } = useSelector((state) => state.teamTwo);
  let gameStatus = useSelector((state) => state.game.status);

  // firebase room  & players reference
  let roomRef = ref(database, 'rooms/' + roomId);
  let playersInRoomRef = ref(database, 'rooms/' + roomId + '/players/');
  let playerNestedInRoomRef = ref(database, 'rooms/' + roomId + '/players/' + playerId);
  let gameRef = ref(database, 'rooms/' + roomId + '/game/');
  let cardsRef = ref(database, `rooms/${roomId}/gameboard`);

  const teamOneOperativesIds = Object.values(teamOneOperatives).map((operative) => {
    return operative.playerId;
  });
  const teamTwoOperativesIds = Object.values(teamTwoOperatives).map((operative) => {
    return operative.playerId;
  });

  // determines if there is at least one player in each 'role' and then shows the button for start game
  // not uncommenting code in the return until we're done testing, but it works :)
  const isEveryRoleFilled = () => {
    if (teamOneOperatives.length > 0) {
      if (teamTwoOperatives.length > 0) {
        if (teamOneSpymaster.length > 0) {
          if (teamTwoSpymaster.length > 0) {
            return true;
          }
        }
      }
    }
    return false;
  };
  const everyonesHere = isEveryRoleFilled();

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
        console.log('room already created, just add the player!');
        // playerId is key in the room/roomId/players/playerId, so we creating new player obj
        set(child(playersInRoomRef, playerId), { playerId, username });
      } else {
        console.log('room does not exist...yet! Creating it now...');

        // TODO for now: this is where we do /api/makeRoom to create a room

        // Creating room in firebase:
        // create the room, (nested) players, and host.
        set(roomRef, {
          roomId: roomId,
          host: { playerId, username },
          players: { [playerId]: { playerId, username } },
          game: {
            gameStatus: 'ready',
            team1RemainingCards: 9,
            team2RemainingCards: 8,
          },
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

    onValue(playerNestedInRoomRef, (snapshot) => {
      if (snapshot.exists()) {
        onDisconnect(playerNestedInRoomRef).remove(playersInRoomRef + '/' + playerId);
      }
    });

    // setting the 'turn' on the frontend will help determine what users are seeing depending on their role
    // for example, if its team1spymasters turn, they'll see the input clue box and number dropdown
    onValue(gameRef, (snapshot) => {
      if (snapshot.exists()) {
        const game = snapshot.val();
        const team1RemainingCards = snapshot.val().team1RemainingCards;
        const team2RemainingCards = snapshot.val().team2RemainingCards;
        dispatch(setTeam1RemainingCards(team1RemainingCards));
        dispatch(setTeam2RemainingCards(team2RemainingCards));

        if (game.team1RemainingCards && game.team2RemainingCards) {
          if (game.gameStatus === 'team1SpyTurn') {
            dispatch(setStatus('team1SpyTurn'));
          } else if (game.gameStatus === 'team2SpyTurn') {
            dispatch(setStatus('team2SpyTurn'));
          } else if (game.gameStatus === 'team1OpsTurn') {
            dispatch(setStatus('team1OpsTurn'));
          } else if (game.gameStatus === 'team2OpsTurn') {
            dispatch(setStatus('team2OpsTurn'));
          } else if (game.gameStatus === 'gameOver') {
            // havent gotten here yet really, but presumably we'd want to:
            // dispatch(setStatus('')) --> its no ones turn anymore
            // set and get winning team from firebase so that we can...
            // dispatch(setWinner(teamThatWon))
          }
        }
        // update cards remaining in redux and firebase
        if (game.team1RemainingCards === 0) {
          console.log('team 1 wins!');
        }
        if (game.team2RemainingCards === 0) {
          console.log('team 2 wins!');
        }
      }
    });

    // Look to see if there are cards already loaded for the room
    onValue(cardsRef, (snapshot) => {
      // If there are cards in /room/roomId/cards
      if (snapshot.exists()) {
        //update our redux to reflect that
        const cardsFromSnapshot = snapshot.val();
        const values = Object.values(cardsFromSnapshot);
        dispatch(setWordsInGame(values));
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
            <Item style={styles.sx.PlayerContainer}>Welcome, {username}</Item>
            <Item style={styles.sx.PlayerContainer}>Room id: {roomId}</Item>
            <Item style={styles.sx.PlayerContainer}>
              Players:
              {allPlayers?.map((player) => (
                <p key={player.playerId}>{player.username}</p>
              ))}
            </Item>
            {gameStatus !== 'ready' && (
              <Item style={styles.sx.PlayerContainer}>
                Turn:
                {gameStatus}
              </Item>
            )}
          </Grid>
          <Grid item xs={3} md={4} style={styles.sx.BoardGrid}>
            <TeamOneBox />
          </Grid>
          <Grid item xs={3} md={4} style={styles.sx.BoardGrid}>
            <Item>Game History</Item>
          </Grid>
          <Grid item xs={3} md={4} style={styles.sx.BoardGrid}>
            <TeamTwoBox />
          </Grid>
        </Grid>
      </Container>

      {/* is there isnt at least one person to each role, setup board should be disabled / not visible */}
      {!everyonesHere && <p>Make sure there is at least one person in each role!</p>}
      {/* is host AND there is at least one person on each team */}
      {isHost && (
        <Popup
          trigger={
            <Button
              style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Set Up Board
            </Button>
          }
        >
          <SetupGame />
        </Popup>
      )}
      {/* COMMENTING OUT THE BELOW CODE UNTIL WE'RE READY TO TEST WTH ALL ROLES FILLED */}
      {/* {isHost && everyonesHere && (
        <Popup
          trigger={
            <Button
              style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Set Up Board
            </Button>
          }
        >
          <SetupGame />
        </Popup>
      )} */}

      {/* player is operative && show operative board, otherwise theyre a spymaster*/}
      {/* this is working for now, but we probably need more protection to not display 
      a spymaster board on someone who randomly joins room while game is 'in progress' */}
      {teamOneOperativesIds.includes(playerId) || teamTwoOperativesIds.includes(playerId) ? (
        <OperativeBoard />
      ) : (
        <SpyMasterBoard />
      )}
    </>
  );
};

export default RoomView;
