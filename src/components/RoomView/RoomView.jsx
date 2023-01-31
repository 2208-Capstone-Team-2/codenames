import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRoomId } from '../../store/playerSlice';
import { useParams } from 'react-router-dom';
import { onValue, ref, set, get, child, update, onDisconnect } from 'firebase/database';
import { database } from '../../utils/firebase';
import { setAllPlayers } from '../../store/allPlayersSlice';
import './roomView.css';
import Popup from 'reactjs-popup';
import SetupGame from './setupGame.jsx';
import { setWordsInGame } from '../../store/wordsInGameSlice';
import WelcomeBoard from './WelcomeBoard';
import {
  setTeam1RemainingCards,
  setTeam2RemainingCards,
  setStatus,
  setShowResetButton,
  setWinner,
  setLoser,
  setGuessesRemaining,
  setHost,
} from '../../store/gameSlice';
import OperativeBoard from './OperativeBoard.jsx';
import SpyMasterBoard from './SpyMasterBoard';
import TeamOneBox from '../teamBoxes/TeamOneBox';
import TeamTwoBox from '../teamBoxes/TeamTwoBox';
import { Button } from '@mui/material';
import { setGameHistory } from '../../store/gameSlice';
import { setCurrentClue } from '../../store/clueSlice.js';
import axios from 'axios';
import { isEveryRoleFilled } from '../../utils/Utils';
import Clue from './Clue';
import GameLog from './gameLog';
import GameStatus from './GameStatus';
import { setIsHost } from '../../store/playerSlice';

const RoomView = (props) => {
  // for room nav
  const { roomId } = useParams();
  setRoomId(roomId);

  const dispatch = useDispatch();

  // frontend state
  const { playerId, username, isHost } = useSelector((state) => state.player);
  const { teamOneOperatives, teamOneSpymaster } = useSelector((state) => state.teamOne);
  const { teamTwoOperatives, teamTwoSpymaster } = useSelector((state) => state.teamTwo);
  const host = useSelector((state) => state.game.host);
  // firebase room  & players reference
  let playersInRoomRef = ref(database, 'rooms/' + roomId + '/players/');
  let gameRef = ref(database, 'rooms/' + roomId + '/game/');
  let cardsRef = ref(database, `rooms/${roomId}/gameboard`);
  let gameHistoryRef = ref(database, `rooms/${roomId}/game/history`);
  const teamOneSpymasterRef = ref(database, `rooms/${roomId}/team-1/spymaster/`);
  const teamOneOperativesRef = ref(database, `rooms/${roomId}/team-1/operatives/`);
  const teamTwoOperativesRef = ref(database, `rooms/${roomId}/team-2/operatives/`);
  const teamTwoSpymasterRef = ref(database, `rooms/${roomId}/team-2/spymaster/`);
  let hostRef = ref(database, `rooms/${roomId}/host`);
  const playerRef = ref(database, `players/${playerId}`);

  // below will be used once we allow host & everyones here to show button
  // DO NOT DELETE
  const everyonesHere = isEveryRoleFilled(teamOneOperatives, teamTwoOperatives, teamOneSpymaster, teamTwoSpymaster);

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
        dispatch(setStatus(game.gameStatus));
        dispatch(setTeam1RemainingCards(game.team1RemainingCards));
        dispatch(setTeam2RemainingCards(game.team2RemainingCards));
        dispatch(setGuessesRemaining(game.guessesRemaining));
        if (game.guessesRemaining <= 0) {
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
          dispatch(setGameHistory([]));
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

  useEffect(() => {
    onValue(hostRef, (snapshot) => {
      if (snapshot.exists()) {
        let firebaseHost = snapshot.val();
        dispatch(setHost(firebaseHost));
        if (firebaseHost.playerId !== playerId) {
          // playerId is null below, so its not making this connection
          // why cant i access redux inside of onvalue
          update(playerRef, { isHost: false });
          dispatch(setIsHost(false));
        }
        if (firebaseHost.playerId === playerId) {
          update(playerRef, { isHost: true });
          dispatch(setIsHost(true));
        }
      } else {
        // ignore this for now. potential other way to solve host auto select
        // getall players ref
        // grab first player
        // assign as host- update host ref
        // update player ref
        // update playersInRoomRef
        console.log('there is no host!');
        dispatch(setHost(null));
      }
    });
  }, [playerId]);

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

  const claimHost = () => {
    set(hostRef, { playerId, username: username });
    // for soem reason this isnt updating/changing is host to true when clicked
    update(playerRef, { isHost: true });
    update(child(playersInRoomRef, playerId), { playerId, username, isHost: true });
  };
  console.log({ isHost });
  console.log({ host });

  return (
    <div className={props.className}>
      <GameStatus />
      <WelcomeBoard />
      {host !== {} && host !== null && <h3 style={{ color: 'green' }}>The game host is {host.username}</h3>}
      {!isHost && !host && (
        <>
          <h3 style={{ color: 'red' }}>To play, the room needs a host.</h3>
          <button onClick={claimHost}>click to claim host status!</button>
        </>
      )}

      {/* is there isnt at least one person to each role, setup board should be disabled / not visible */}
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
      <div className="flexBox">
        <TeamOneBox />
        <div className="boardContainer">
          {/* player is operative && show operative board, otherwise theyre a spymaster*/}
          {/* this is working for now, but we probably need more protection to not display 
      a spymaster board on someone who randomly joins room while game is 'in progress' */}
          {teamOneSpymaster[0]?.playerId === playerId || teamTwoSpymaster[0]?.playerId === playerId ? (
            <SpyMasterBoard />
          ) : (
            <OperativeBoard />
          )}
        </div>
        <TeamTwoBox />
        <div className="break"></div>
        <GameLog />
        <div className="chatBox"> this will be the chat box</div>
      </div>
      <Clue />
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
    </div>
  );
};

export default RoomView;
