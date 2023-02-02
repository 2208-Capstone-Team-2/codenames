import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import GuessesRemaining from './GuessesRemaining';
import { useState } from 'react';
const GameStatus = () => {
  let gameStatus = useSelector((state) => state.game.status);
  const { playerId } = useSelector((state) => state.player);
  const { teamOneOperatives, teamOneSpymaster } = useSelector((state) => state.teamOne);
  const { teamTwoOperatives, teamTwoSpymaster } = useSelector((state) => state.teamTwo);
  const [playerNote, setPlayerNote] = useState('');

  // will use below prior to user joining game && game being 'ready
  const joinTeamNote = 'Join a team to play the game';

  const otherTeamSpymasterNote = 'The opponent spymaster is playing...wait for your turn';
  const sameTeamSpymasterNote = 'Wait for spymaster to give you a clue';
  const spyGivingClueNote = 'give your operatives a clue';

  const sameTeamOperativesNote = 'Your operatives are guessing now';
  const otherTeamOperativesNote = 'the opponent operative is playing...wait for your turn';
  const operativeGuessingNote = 'guess a word or click end turn';

  useEffect(() => {
    const isPlayerTeamOneOperative = teamOneOperatives.map((operative) => operative.playerId).includes(playerId);
    const isPlayerTeamTwoOperative = teamTwoOperatives.map((operative) => operative.playerId).includes(playerId);

    if (teamOneSpymaster?.playerId === playerId) {
      switch (gameStatus) {
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
      }
    }
    if (teamTwoSpymaster?.playerId === playerId) {
      switch (gameStatus) {
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
      }
    }
    if (isPlayerTeamOneOperative) {
      switch (gameStatus) {
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
      }
    }
    if (isPlayerTeamTwoOperative) {
      switch (gameStatus) {
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
      }
    }
  }, [gameStatus]);

  return (
    <div>
      {gameStatus !== 'ready' && (
        <>
          {playerNote}
          <GuessesRemaining />
        </>
      )}

      {gameStatus === 'ready' && <p>Waiting to begin the game!</p>}
    </div>
  );
};

export default GameStatus;
