import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRoomId } from '../../store/playerSlice';
import { useParams } from 'react-router-dom';
import { onValue, ref, get } from 'firebase/database';
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
import { setTeam1RemainingCards, setTeam2RemainingCards, setStatus } from '../../store/gameSlice';
import OperativeBoard from './OperativeBoard.jsx';
import SpyMasterBoard from './SpyMasterBoard';
import TeamOneBox from '../teamBoxes/TeamOneBox';
import TeamTwoBox from '../teamBoxes/TeamTwoBox';
import { Button } from '@mui/material';
import ClueHistory from './ClueHistory.jsx';
import { setClueHistory } from '../../store/clueSlice.js';
import axios from 'axios';

import Clue from './Clue';
const RoomView = () => {
  // for room nav
  const { roomId } = useParams();
  setRoomId(roomId);
  const dispatch = useDispatch();

  // frontend state
  const { playerId, username, isHost } = useSelector((state) => state.player);

  const { allPlayers } = useSelector((state) => state.allPlayers);
  const { teamOneOperatives, teamOneSpymaster } = useSelector((state) => state.teamOne);
  const { teamTwoOperatives, teamTwoSpymaster } = useSelector((state) => state.teamTwo);
  let gameStatus = useSelector((state) => state.game.status);

  // firebase room  & players reference
  let playersInRoomRef = ref(database, 'rooms/' + roomId + '/players/');
  let gameRef = ref(database, 'rooms/' + roomId + '/game/');
  let cardsRef = ref(database, `rooms/${roomId}/gameboard`);
  let clueHistoryRef = ref(database, `rooms/${roomId}/clues/`);

  const teamOneSpymasterRef = ref(database, `rooms/${roomId}/team-1/spymaster/`);
  const teamOneOperativesRef = ref(database, `rooms/${roomId}/team-1/operatives/`);
  const teamTwoOperativesRef = ref(database, `rooms/${roomId}/team-2/operatives/`);
  const teamTwoSpymasterRef = ref(database, `rooms/${roomId}/team-2/spymaster/`);
  const teamOneSpyId = Object.values(teamOneSpymaster).map((spy) => {
    return spy.playerId;
  });
  const teamTwoSpyId = Object.values(teamTwoSpymaster).map((spy) => {
    return spy.playerId;
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

    // rose - i'm pretty sure i have thiis dc rule set elsewhere
    // onValue(playerNestedInRoomRef, (snapshot) => {
    //   if (snapshot.exists()) {
    //     onDisconnect(playerNestedInRoomRef).remove(playersInRoomRef + '/' + playerId);
    //   }
    // });

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
  }, []);

  useEffect(() => {
    // Look to see if there are cards already loaded for the room
    onValue(cardsRef, async (cardSnapshot) => {
      // for some reason, i'm having trouble accessing the redux teams
      //  data even though it exists on firebase and redux
      // tried a few diff ways and this is what i could get to work. bulky :(
      if (cardSnapshot.exists()) {
        get(teamOneSpymasterRef).then(async (snapshot) => {
          if (snapshot.exists()) {
            let spymaster = snapshot.val();
            let spymasterId = Object.keys(spymaster);
            if (spymasterId.includes(playerId)) {
              console.log('setting spy board...');
              //get set of cards with team ids from backend and set spymaster words
              let wordsWithTeamIds = {};
              let spyWords = await axios.get(`/api/card/get25/forRoom/${roomId}`);
              spyWords.data.forEach(
                (card) =>
                  (wordsWithTeamIds[card.id] = {
                    id: card.id,
                    isVisibleToAll: card.isVisibleToAll,
                    word: card.word.word,
                    wordId: card.wordId,
                    boardId: card.boardId,
                    teamId: card.teamId,
                  }),
              );
              const values = Object.values(wordsWithTeamIds);
              dispatch(setWordsInGame(values));
            }
          }
        });
        get(teamTwoSpymasterRef).then(async (snapshot) => {
          if (snapshot.exists()) {
            let spymaster = snapshot.val();
            let spymasterId = Object.keys(spymaster);
            if (spymasterId.includes(playerId)) {
              console.log('setting spy board...');

              //get set of cards with team ids from backend and set spymaster words
              let wordsWithTeamIds = {};
              let spyWords = await axios.get(`/api/card/get25/forRoom/${roomId}`);
              spyWords.data.forEach(
                (card) =>
                  (wordsWithTeamIds[card.id] = {
                    id: card.id,
                    isVisibleToAll: card.isVisibleToAll,
                    word: card.word.word,
                    wordId: card.wordId,
                    boardId: card.boardId,
                    teamId: card.teamId,
                  }),
              );
              const values = Object.values(wordsWithTeamIds);
              dispatch(setWordsInGame(values));
            }
          }
        });
        get(teamOneOperativesRef).then((snapshot) => {
          if (snapshot.exists()) {
            let operatives = snapshot.val();
            let operativesIds = Object.keys(operatives);
            if (operativesIds.includes(playerId)) {
              console.log('setting opertive board...');
              //update our redux to reflect that
              const cardsFromSnapshot = cardSnapshot.val();
              const values = Object.values(cardsFromSnapshot);
              dispatch(setWordsInGame(values));
            }
          }
        });
        onValue(clueHistoryRef, (snapshot) => {
          if (snapshot.exists()) {
            //below line will give us an object looking like this {firebaseRandomKey:{clueString:"clue",clueNumber:"4",playerSubmmiteed:"randomeKey"}}
            const clues = snapshot.val();
            let history = [];
            //this is to access the data under random firebase key and put them in an iterable array
            for (let clueKey in clues) {
              history.push(clues[clueKey]);
            }
            dispatch(setClueHistory(history));
          }
        });
        get(teamTwoOperativesRef).then((snapshot) => {
          if (snapshot.exists()) {
            let operatives = snapshot.val();
            let operativesIds = Object.keys(operatives);
            if (operativesIds.includes(playerId)) {
              console.log('setting opertive board...');
              //update our redux to reflect that
              const cardsFromSnapshot = cardSnapshot.val();
              const values = Object.values(cardsFromSnapshot);
              dispatch(setWordsInGame(values));
            }
          }
        });
      }
    });
  }, [playerId]);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <>
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
            {/* import clueHistory component */}
            <ClueHistory />
            <Clue />
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
      {teamOneSpyId.includes(playerId) || teamTwoSpyId.includes(playerId) ? <SpyMasterBoard /> : <OperativeBoard />}
    </>
  );
};

export default RoomView;
