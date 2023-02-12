import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { RootState } from '../../store';
const GameStatus = () => {
  const gameStatus = useSelector((state: RootState) => state.game.status);
  const guessesRemaining = useSelector((state: RootState) => state.game.guessesRemaining);
  const { playerId, teamId } = useSelector((state: RootState) => state.player);
  const { teamOneOperatives, teamOneSpymaster } = useSelector((state: RootState) => state.teamOne);
  const { teamTwoOperatives, teamTwoSpymaster } = useSelector((state: RootState) => state.teamTwo);
  const [playerNote, setPlayerNote] = useState<string>('');

  // will use below prior to user joining game && game being 'ready
  const joinTeamNote: string = 'Join a team to play the game';

  const otherTeamSpymasterNote: string = 'The opponent spymaster is playing...wait for your turn';
  const sameTeamSpymasterNote: string = 'Wait for spymaster to give you a clue';
  const spyGivingClueNote: string = 'give your operatives a clue';

  const sameTeamOperativesNote: string = 'Your operatives are guessing now';
  const otherTeamOperativesNote: string = 'the opponent operative is playing...wait for your turn';
  const operativeGuessingNote: string = 'guess a word or click end turn';

  useEffect(() => {
    const isPlayerTeamOneOperative: boolean = teamOneOperatives
      .map((operative) => operative.playerId)
      .includes(playerId);
    const isPlayerTeamTwoOperative: boolean = teamTwoOperatives
      .map((operative) => operative.playerId)
      .includes(playerId);

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
    if (!teamId) {
      switch (gameStatus) {
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
      }
    }
  }, [gameStatus]);

  if (gameStatus === 'ready') return <p className="gameStatus">Waiting to begin the game!</p>;
  else
    return (
      <p className="gameStatus">
        {playerNote}
        {guessesRemaining && <>: {guessesRemaining} guesses remaining </>}
      </p>
    );
};

export default GameStatus;
