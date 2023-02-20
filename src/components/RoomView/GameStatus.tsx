import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { RootState } from '../../store';
import { child, update, ref, onValue } from 'firebase/database';
import { database } from '../../utils/firebase';
import { setCurrentClue } from '../../store/clueSlice';
import { useDispatch } from 'react-redux';
import './gameStatus.css';
const GameStatus = () => {
  const { status, guessesRemaining, host } = useSelector((state: RootState) => state.game);
  const { playerId, teamId, username, roomId } = useSelector((state: RootState) => state.player);
  const { teamOneOperatives, teamOneSpymaster } = useSelector((state: RootState) => state.teamOne);
  const { teamTwoOperatives, teamTwoSpymaster } = useSelector((state: RootState) => state.teamTwo);
  const { currentClue } = useSelector((state: RootState) => state.clues);
  const [playerNote, setPlayerNote] = useState<string>('');
  const dispatch = useDispatch();

  // firebase references
  let playersInRoomRef = ref(database, `rooms/${roomId}/players/`);
  let hostRef = ref(database, `rooms/${roomId}/host`);
  const currentClueRef = ref(database, `rooms/${roomId}/game/currentClue`);

  // possible game status strings
  const otherTeamSpymasterNote: string = 'The opponent spymaster is playing...wait for your turn';
  const sameTeamSpymasterNote: string = 'Wait for spymaster to give you a clue.';
  const spyGivingClueNote: string = 'Give your operatives a clue!';
  const sameTeamOperativesNote: string = `The clue is: ${currentClue.clueString}. Your operatives are guessing now`;
  const otherTeamOperativesNote: string = `The clue is: ${currentClue.clueString}. The opponent operative is playing...`;
  const operativeGuessingNote: string = `The clue is: ${currentClue.clueString}. Guess a word or click end turn`;

  const claimHost = () => {
    update(hostRef, { playerId, username });
    update(child(playersInRoomRef, playerId), { playerId, username, isHost: true });
  };

  useEffect(() => {
    const isPlayerTeamOneOperative: boolean = teamOneOperatives
      .map((operative) => operative.playerId)
      .includes(playerId);
    const isPlayerTeamTwoOperative: boolean = teamTwoOperatives
      .map((operative) => operative.playerId)
      .includes(playerId);

    if (teamOneSpymaster?.playerId === playerId) {
      switch (status) {
        case 'team1SpyTurn':
          setPlayerNote(spyGivingClueNote);
          break;
        case 'team2SpyTurn':
          setPlayerNote(otherTeamSpymasterNote);
          break;
        case 'team1OpsTurn':
          setPlayerNote(sameTeamOperativesNote);
          break;
        case 'team2OpsTurn':
          setPlayerNote(otherTeamOperativesNote);
          break;
        case 'complete':
          setPlayerNote('game over!');
          break;
      }
    }
    if (teamTwoSpymaster?.playerId === playerId) {
      switch (status) {
        case 'team1SpyTurn':
          setPlayerNote(otherTeamSpymasterNote);
          break;
        case 'team2SpyTurn':
          setPlayerNote(spyGivingClueNote);
          break;
        case 'team1OpsTurn':
          setPlayerNote(otherTeamOperativesNote);
          break;
        case 'team2OpsTurn':
          setPlayerNote(sameTeamOperativesNote);
          break;
        case 'complete':
          setPlayerNote('game over!');
          break;
      }
    }
    if (isPlayerTeamOneOperative) {
      switch (status) {
        case 'team1SpyTurn':
          setPlayerNote(sameTeamSpymasterNote);
          break;
        case 'team2SpyTurn':
          setPlayerNote(otherTeamSpymasterNote);
          break;
        case 'team1OpsTurn':
          setPlayerNote(operativeGuessingNote);
          break;
        case 'team2OpsTurn':
          setPlayerNote(otherTeamOperativesNote);
          break;
        case 'complete':
          setPlayerNote('game over!');
          break;
      }
    }
    if (isPlayerTeamTwoOperative) {
      switch (status) {
        case 'team1SpyTurn':
          setPlayerNote(otherTeamSpymasterNote);
          break;
        case 'team2SpyTurn':
          setPlayerNote(sameTeamSpymasterNote);
          break;
        case 'team1OpsTurn':
          setPlayerNote(otherTeamOperativesNote);
          break;
        case 'team2OpsTurn':
          setPlayerNote(operativeGuessingNote);
          break;
        case 'complete':
          setPlayerNote('game over!');
          break;
      }
    }
    if (!teamId) {
      switch (status) {
        case 'team1SpyTurn':
          setPlayerNote("Team one spymaster's turn");
          break;
        case 'team2SpyTurn':
          setPlayerNote("Team two spymaster's turn");
          break;
        case 'team1OpsTurn':
          setPlayerNote("Team one operative's turn");
          break;
        case 'team2OpsTurn':
          setPlayerNote("Team two operative's turn");
          break;
        case 'complete':
          setPlayerNote('game over!');
          break;
      }
    }

  }, [status]);

  useEffect(() => {
    onValue(currentClueRef, (snapshot) => {
      if (snapshot.exists()) {
        const clue = snapshot.val();
        dispatch(setCurrentClue(clue));
      } else {
        console.log('no clue exists')
      }
    });
    /*game status needs to be watched because rendering the current clue 
    depends on whose turn it is / what will show in gamestatus bar */
  }, [status]);

  const showGuessesRemaining = !(guessesRemaining === 0 || guessesRemaining === undefined);
  const gameInProgress = status !== 'ready' && status !== 'complete';
  const gameReady = status === 'ready';
  const gameComplete = status === 'complete';


  return (
    <div className="gameStatusRow">
      <div className="gameStatusContainer">
        {gameReady && <h2 className="gameStatusItem">Waiting to begin the game!</h2>}
        {gameComplete && <h2 className="gameStatusItem">Game over!</h2>}
        {gameInProgress && <h2 className="gameStatusItem">{playerNote}</h2>}
        {showGuessesRemaining && <h3 className="gameStatusItem">{guessesRemaining} guesses remaining</h3>}
        {!host && (
          <p className="gameStatusItem claimHostText">
            The host left the room!
            <button className="claimHostButton" onClick={claimHost}>
              Claim Host
            </button>{' '}
            for the next game.
          </p>
        )}
      </div>
    </div>
  );
};

export default GameStatus;
