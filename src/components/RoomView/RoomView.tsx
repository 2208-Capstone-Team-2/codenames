import React, { useEffect } from 'react';
import { isEveryRoleFilled } from '../../utils/utilFunctions';
// Custom Hooks
import OnValueHostRef from './customHooks/OnValueHostRef';
import OnValueCardsRef from './customHooks/OnValueCardsRef';
import OnValueGameHistoryRef from './customHooks/OnValueGameHistoryRef';
import OnValueTeamDispatch from './customHooks/OnValueTeamDispatch';
// Components:
import SetupGame from './SetupGame';
import OperativeBoard from './boardAndCardsOperatives/OperativeBoard';
import SpyMasterBoard from './boardAndCardsSpy/SpyMasterBoard';
import TeamOneBox from '../teamBoxes/TeamOneBox';
import TeamTwoBox from '../teamBoxes/TeamTwoBox';
import Clue from './clue/Clue';
import GameLog from './gameLog';
import GameStatus from './GameStatus';
import WinnerLoserPopup from './WinnerLoserPopup';
import Navbar from '../Navbar/Navbar';
import Chat from './chat/Chat';
import Footer from '../Footer/Footer';
// Firebase:
import { database } from '../../utils/firebase';
import { onValue, ref, set, get, child, update, off } from 'firebase/database';
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
  setShowStartGame,
} from '../../store/gameSlice';
import { setCurrentClue } from '../../store/clueSlice';
import { RootState } from '../../store/index.js';
// CSS:
import './roomView.css';
import axios from 'axios';
import { CardObj, WordsWithTeamIdsObj } from '../../utils/interfaces'; // For TS

const RoomView = () => {
  // for room nav
  const { roomId } = useParams();
  setRoomId(roomId);
  const dispatch = useDispatch();

  // frontend state
  const { playerId, username, isHost } = useSelector((state: RootState) => state.player);
  const { teamOneOperatives, teamOneSpymaster } = useSelector((state: RootState) => state.teamOne);
  const { teamTwoOperatives, teamTwoSpymaster } = useSelector((state: RootState) => state.teamTwo);

  const { status, showStartGame } = useSelector((state: RootState) => state.game);
  // firebase room  & players reference
  let playersInRoomRef = ref(database, `rooms/${roomId}/players/`);
  let gameRef = ref(database, `rooms/${roomId}/game/`);
  const { wordsInGame } = useSelector((state: RootState) => state.wordsInGame);
  const cardsRef = ref(database, `rooms/${roomId}/gameboard`);

  // below will be used once we allow host & everyones here to show button
  // DO NOT DELETE
  const everyonesHere = isEveryRoleFilled(teamOneOperatives, teamTwoOperatives, teamOneSpymaster, teamTwoSpymaster);

  const playerIsSpymaster = teamOneSpymaster?.playerId === playerId || teamTwoSpymaster?.playerId === playerId;

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
          onValue(cardsRef, async (cardSnapshot) => {
            if (cardSnapshot.exists()) {
              if (playerIsSpymaster) {
                off(cardsRef); // don't listen to this listener anymore
                let wordsWithTeamIds = {} as WordsWithTeamIdsObj;

                console.log('making get25 req!');
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
              } else {
                off(cardsRef); // don't listen to this listener anymore.
                const cardsFromSnapshot = cardSnapshot.val();
                const values = Object.values(cardsFromSnapshot);
                dispatch(setWordsInGame(values));
              }
            }
          });
          // ONVALUE END
          dispatch(setStatus('ready'));
          dispatch(setTeam1RemainingCards(9));
          dispatch(setTeam2RemainingCards(8));
          dispatch(setWordsInGame([]));
          dispatch(setCurrentClue({}));
          dispatch(setGameHistory([]));
          dispatch(setGuessesRemaining(0));
          dispatch(setShowResetButton(false));
          dispatch(setShowStartGame(true));
          dispatch(setWinner(''));
          dispatch(setLoser(''));
        }

        if (game.team1RemainingCards === 0) {
          // set firebase gameStatus to 'complete' && respective winner/loser
          update(gameRef, { gameStatus: 'complete' });
          set(child(gameRef, 'winner'), 'team-1');
          set(child(gameRef, 'loser'), 'team-2');
        }

        if (game.team2RemainingCards === 0) {
          // set firebase gameStatus to 'complete' && respective winner/loser
          update(gameRef, { gameStatus: 'complete' });
          set(child(gameRef, 'winner'), 'team-2');
          set(child(gameRef, 'loser'), 'team-1');
        }

        if (game.gameStatus === 'complete') {
          dispatch(setShowResetButton(true));
          dispatch(setWinner(game.winner));
          dispatch(setLoser(game.loser));
        }
      }
    });
  }, [status, teamOneSpymaster, teamOneSpymaster]);

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

  OnValueHostRef();
  OnValueGameHistoryRef();
  OnValueTeamDispatch();
  OnValueCardsRef();

  return (
    <div className="roomViewGrid">
      <Navbar />
      <GameStatus />
      {isHost && showStartGame && <SetupGame />}
      <TeamOneBox />
      <div className="boardContainer">{playerIsSpymaster ? <SpyMasterBoard /> : <OperativeBoard />}</div>
      <TeamTwoBox />
      <div className="break"></div>
      <GameLog />
      <Chat />

      <Clue />
      <WinnerLoserPopup />
      {/* COMMENTING OUT THE BELOW CODE UNTIL WE'RE DONE TESTING*/}
      {/* {isHost && everyonesHere &&  <SetupGame />*/}
      <Footer />
    </div>
  );
};
export default RoomView;
