import React, { useEffect, useState } from 'react';
import { isEveryRoleFilled } from '../../utils/utilFunctions';
// Custom Hooks
import OnValueHostRef from './customHooks/OnValueHostRef';
import OnValueCardsRef from './customHooks/OnValueCardsRef';
import OnValueGameHistoryRef from './customHooks/OnValueGameHistoryRef';
import OnValueNestedPlayerRef from './customHooks/OnValueNestedPlayerRef';

// Components:
import SetupGame from './SetupGame';
import OperativeBoard from './OperativeBoard';
import SpyMasterBoard from './SpyMasterBoard';
import TeamOneBox from '../teamBoxes/TeamOneBox';
import TeamTwoBox from '../teamBoxes/TeamTwoBox';
import Clue from './Clue';
import GameLog from './gameLog';
import GameStatus from './GameStatus';
import Loser from './Loser';
import Winner from './Winner';
import Navbar from '../Navbar/Navbar';
import Popup from '../Room/Popup';
// Firebase:
import { database } from '../../utils/firebase';
import { onValue, ref, set, get, child, update } from 'firebase/database';
// Redux:
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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
  setGameHistory,
} from '../../store/gameSlice';
import { setCurrentClue } from '../../store/clueSlice';
import { RootState } from '../../store/index.js';
// CSS:
import './roomView.css';
interface ClassName {
  className: string;
}

const RoomView = (props: ClassName) => {
  // for room nav
  const { roomId } = useParams();
  setRoomId(roomId);
  const dispatch = useDispatch();

  // frontend state
  const [timedPopup, setTimedPopup] = useState(false);
  const { playerId, username, isHost } = useSelector((state: RootState) => state.player);
  const { teamOneOperatives, teamOneSpymaster } = useSelector((state: RootState) => state.teamOne);
  const { teamTwoOperatives, teamTwoSpymaster } = useSelector((state: RootState) => state.teamTwo);
  const { host } = useSelector((state: RootState) => state.game);
  // firebase room  & players reference
  let playersInRoomRef = ref(database, `rooms/${roomId}/players/`);
  let gameRef = ref(database, `rooms/${roomId}/game/`);
  let hostRef = ref(database, `rooms/${roomId}/host`);

  // below will be used once we allow host & everyones here to show button
  // DO NOT DELETE
  const everyonesHere = isEveryRoleFilled(teamOneOperatives, teamTwoOperatives, teamOneSpymaster, teamTwoSpymaster);

  useEffect(() => {
    window.scrollTo(0, 0);
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

    setTimeout(() => {
      setTimedPopup(true);
    }, 1000);
  }, []);

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
            update(gameRef, { gameStatus: nextStatus, guessesRemaining: 0 });
          }
          if (game.gameStatus === 'team2OpsTurn') {
            nextStatus = 'team1SpyTurn';
            update(gameRef, { gameStatus: nextStatus, guessesRemaining: 0 });
          }
        }
      }
    });
  };

  const claimHost = () => {
    update(hostRef, { playerId, username });
    update(child(playersInRoomRef, playerId), { playerId, username, isHost: true });
  };

  OnValueHostRef();
  OnValueCardsRef();
  OnValueGameHistoryRef();
  OnValueNestedPlayerRef()
  return (
    <div className={`${props.className} roomViewBG`}>
      <Navbar />
      <div className="gameStatusClaimHost">
        <GameStatus />
        <div className="gameStatus">
          {!host && (
            <p>
              The host has left, need a <button onClick={claimHost}>New Host</button> to begin game.
            </p>
          )}
        </div>
      </div>
      {/* is there isnt at least one person to each role, setup board should be disabled / not visible */}
      {/* is host AND there is at least one person on each team */}
      {isHost && (
        <Popup trigger={timedPopup} setTrigger={setTimedPopup} className="setupGamePopup">
          <SetupGame />
        </Popup>
      )}
      <div className="flexBox">
        <TeamOneBox />
        <div className="boardContainer">
          {/* player is operative && show operative board, otherwise theyre a spymaster*/}
          {/* this is working for now, but we probably need more protection to not display 
      a spymaster board on someone who randomly joins room while game is 'in progress' */}
          {teamOneSpymaster?.playerId === playerId || teamTwoSpymaster?.playerId === playerId ? (
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
      <Loser />
      <Winner />
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
