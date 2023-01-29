import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRoomId } from '../../store/playerSlice';
import { useParams } from 'react-router-dom';
import { onValue, ref, set, get, child, update } from 'firebase/database';
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
import {
  setTeam1RemainingCards,
  setTeam2RemainingCards,
  setStatus,
  setShowResetButton,
  setWinner,
  setLoser,
} from '../../store/gameSlice';
import OperativeBoard from './OperativeBoard.jsx';
import SpyMasterBoard from './SpyMasterBoard';
import TeamOneBox from '../teamBoxes/TeamOneBox';
import TeamTwoBox from '../teamBoxes/TeamTwoBox';
import { Button } from '@mui/material';
import ClueHistory from './ClueHistory.jsx';
import { setClueHistory, setCurrentClue } from '../../store/clueSlice.js';
import axios from 'axios';

import Clue from './Clue';
import GuessesRemaining from './GuessesRemaining';
import { setGuessesRemaining } from '../../store/gameSlice';

import ResetGame from './ResetGame';

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

    // setting the 'turn' on the frontend will help determine what users are seeing depending on their role
    // for example, if its team1spymasters turn, they'll see the input clue box and number dropdown
    onValue(gameRef, (snapshot) => {
      if (snapshot.exists()) {
        const game = snapshot.val();
        const team1RemainingCards = snapshot.val().team1RemainingCards;
        const team2RemainingCards = snapshot.val().team2RemainingCards;
        const guessesRemaining = snapshot.val().guessesRemaining;
        dispatch(setStatus(game.gameStatus));
        dispatch(setTeam1RemainingCards(team1RemainingCards));
        dispatch(setTeam2RemainingCards(team2RemainingCards));
        dispatch(setGuessesRemaining(guessesRemaining));
        if (guessesRemaining <= 0) {
          endTurn();
        }

        /* when game is 'reset' it sets the firebase game status 
        to 'ready' which triggers the redux cleanup below */
        if (game.gameStatus === 'ready') {
          dispatch(setStatus('ready'));
          dispatch(setTeam1RemainingCards(9));
          dispatch(setTeam2RemainingCards(8));
          dispatch(setWordsInGame([]));
          dispatch(setCurrentClue({}));
          dispatch(setClueHistory([]));
          dispatch(setGuessesRemaining(0));
          dispatch(setShowResetButton(false));
        }

        if (game.team1RemainingCards === 0) {
          // set firebase gameStatus to 'complete'
          // set winner / set loser to redux
          // Update game state to "complete" in firebase
          update(gameRef, { gameStatus: 'complete' });
          // Update game state to "complete" in redux
          dispatch(setGuessesRemaining(0));

          //Set redux winner to team 1
          dispatch(setWinner('team-1'));
          set(child(gameRef, 'winner'), 'team-1');
          //Set redux loser to team 2
          dispatch(setLoser('team-2'));
          set(child(gameRef, 'loser'), 'team-2');
          dispatch(setShowResetButton(true));
        }
        if (game.team2RemainingCards === 0) {
          // set firebase gameStatus to 'complete'
          // set winner / set loser to redux
          // Update game state to "complete" in firebase
          update(gameRef, { gameStatus: 'complete' });
          // Update game state to "complete" in redux
          //Set redux winner to team 2
          dispatch(setWinner('team-2'));
          set(child(gameRef, 'winner'), 'team-2');
          dispatch(setGuessesRemaining(0));
          //Set redux loser to team 1
          dispatch(setLoser('team-1'));
          set(child(gameRef, 'loser'), 'team-1');
          dispatch(setShowResetButton(true));
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
  }, []);

  useEffect(() => {
    // Look to see if there are cards already loaded for the room
    onValue(cardsRef, async (cardSnapshot) => {
      // for some reason, i'm having trouble accessing the redux teams
      //  data even though it exists on firebase and redux
      // tried a few diff ways and this is what i could get to work. bulky :(
      if (cardSnapshot.exists()) {
        if (teamOneSpymaster[0]?.playerId === playerId || teamTwoSpymaster[0]?.playerId === playerId) {
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
        } else {
          const cardsFromSnapshot = cardSnapshot.val();
          const values = Object.values(cardsFromSnapshot);
          dispatch(setWordsInGame(values));
        }
      }
    });
  }, [playerId, teamOneSpymaster, teamTwoSpymaster, teamOneOperatives, teamTwoOperatives]);

  // this function works everywhere else without having to 'get' the gamestatus from firebase
  // it would NOT cooperate or pull accurate game status from redux. :|
  const endTurn = () => {
    let nextStatus;
    // get gameref
    get(gameRef).then((snapshot) => {
      const doesGameExist = snapshot.exists();
      if (doesGameExist) {
        let game = snapshot.val();
        if (game.team1RemainingCards && game.team2RemainingCards) {
          if (game.gameStatus === 'team1OpsTurn') {
            console.log('hitting next status');
            nextStatus = 'team2SpyTurn';
            update(gameRef, { gameStatus: nextStatus });
          }
          if (game.gameStatus === 'team2OpsTurn') {
            nextStatus = 'team1SpyTurn';
            update(gameRef, { gameStatus: nextStatus });
          }
        }
      }
    });
  };

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
                <GuessesRemaining />
              </Item>
            )}

            <Item style={styles.sx.PlayerContainer}>
              <ResetGame />
            </Item>
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
