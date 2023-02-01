import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { database } from '../../utils/firebase';
import { useParams } from 'react-router-dom';
import { onValue, ref, set, get, child, update } from 'firebase/database';
import './roomView.css';
import Popup from 'reactjs-popup';
import { Button } from '@mui/material';
import { isEveryRoleFilled } from '../../utils/Utils';
import SetupGame from './setupGame.jsx';
import WelcomeBoard from './WelcomeBoard';
import OperativeBoard from './OperativeBoard.jsx';
import SpyMasterBoard from './SpyMasterBoard';
import TeamOneBox from '../teamBoxes/TeamOneBox';
import TeamTwoBox from '../teamBoxes/TeamTwoBox';
import Clue from './Clue';
import GameLog from './gameLog';
import GameStatus from './GameStatus';
import { setRoomId } from '../../store/playerSlice';
import { setAllPlayers } from '../../store/allPlayersSlice';
import { setWordsInGame } from '../../store/wordsInGameSlice';
import {
  setTeam1RemainingCards,
  setTeam2RemainingCards,
  setStatus,
  setShowResetButton,
  setWinner,
  setLoser,
  setGuessesRemaining,
  setGameHistory
} from '../../store/gameSlice';
import { setCurrentClue } from '../../store/clueSlice.js';
import { RootState } from '../../store/index.js';
import words from 'random-words';

interface ClassName{
  className: string;
}

const RoomView = (props:ClassName) => {
  // for room nav
  const { roomId } = useParams();
  setRoomId(roomId);

  const dispatch = useDispatch();

  // frontend state
  const { playerId, username, isHost } = useSelector((state: RootState) => state.player);
  const { teamOneOperatives, teamOneSpymaster } = useSelector((state: RootState) => state.teamOne);
  const { teamTwoOperatives, teamTwoSpymaster } = useSelector((state: RootState) => state.teamTwo);
  // firebase room  & players reference
  let playersInRoomRef = ref(database, 'rooms/' + roomId + '/players/');
  let gameRef = ref(database, 'rooms/' + roomId + '/game/');
  let cardsRef = ref(database, `rooms/${roomId}/gameboard`);
  let gameHistoryRef = ref(database, `rooms/${roomId}/game/history`);
  const teamOneSpymasterRef = ref(database, `rooms/${roomId}/team-1/spymaster/`);
  const teamOneOperativesRef = ref(database, `rooms/${roomId}/team-1/operatives/`);
  const teamTwoOperativesRef = ref(database, `rooms/${roomId}/team-2/operatives/`);
  const teamTwoSpymasterRef = ref(database, `rooms/${roomId}/team-2/spymaster/`);
  // below will be used once we allow host & everyones here to show button
  // DO NOT DELETE
  const everyonesHere = isEveryRoleFilled(teamOneOperatives, teamTwoOperatives, teamOneSpymaster, teamTwoSpymaster);

// this is from word assoc with id, etc.
interface WordObj {
  word: string;
}

  interface CardObj {
    id: number;
    isVisibleToAll: boolean;
    wordString: string;
    word: WordObj;
    wordId: number;
    boardId: number;
    teamId: number;
  }

  interface WordsWithTeamIdsObj {
    [index:number] : CardObj;
  }

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
              let wordsWithTeamIds = {} as WordsWithTeamIdsObj;
              let spyWords = await axios.get(`/api/card/get25/forRoom/${roomId}`);
              spyWords.data.forEach(
                (card: CardObj) =>
                  (wordsWithTeamIds[card.id] = {
                    id: card.id,
                    isVisibleToAll: card.isVisibleToAll,
                    wordString: card.word.word,
                    word: card.word,
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
              let wordsWithTeamIds = {} as WordsWithTeamIdsObj;
              let spyWords = await axios.get(`/api/card/get25/forRoom/${roomId}`);
              spyWords.data.forEach(
                (card: CardObj) =>
                  (wordsWithTeamIds[card.id] = {
                    id: card.id,
                    isVisibleToAll: card.isVisibleToAll,
                    wordString: card.word.word,
                    word: card.word,
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

  return (
    <div className={props.className}>
      <GameStatus />
      <WelcomeBoard />
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
