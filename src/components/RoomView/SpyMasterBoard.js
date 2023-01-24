import React from 'react';
import { useSelector } from 'react-redux';
import { ref, update } from 'firebase/database';
import { database } from '../../utils/firebase';
import { Button } from '@mui/material';
import SpyCard from './SpyCard';
const SpyMasterBoard = () => {
  const words = useSelector((state) => state.wordsInGame.wordsInGame);
  const roomId = useSelector((state) => state.player.roomId);
  const playerId = useSelector((state) => state.player.playerId);
  const gameStatus = useSelector((state) => state.game.status);
  const { teamOneSpymaster } = useSelector((state) => state.teamOne);
  const { teamTwoSpymaster } = useSelector((state) => state.teamTwo);
  let gameRef = ref(database, 'rooms/' + roomId + '/game/');
  const teamOneSpymasterId = Object.values(teamOneSpymaster).map((spy) => {
    return spy.playerId;
  });
  const teamTwoSpymasterId = Object.values(teamTwoSpymaster).map((spy) => {
    return spy.playerId;
  });

  const style = {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto auto auto',
    marginTop: '5%',
    gap: '2%',
    justifyContent: 'center',
    alightItems: 'center',
  };

  // only spymaster whos turn it is should see the button that triggers this fxn
  // when the spymaster submits the clue, the operatives gets to guess next
  const submitClue = () => {
    console.log('submitting clue');
    // make sure clue is valid and doesnt contain any of the words on the board
    // clue number should not exceed cards remaining for that team
    // store the clue in clueHistory and as current clue
    // will have for ex: {teamSubmittingClue: 1, clue: string, numOfGuesses: 3}
    let nextGameStatus;
    // if its team1spy submission, team1Ops goes next
    if (gameStatus === 'team1SpyTurn') {
      nextGameStatus = 'team1OpsTurn';
      update(gameRef, { gameStatus: nextGameStatus });
    }
    // if its team2spy submission, team2Ops goes next
    if (gameStatus === 'team2SpyTurn') {
      nextGameStatus = 'team2OpsTurn';
      update(gameRef, { gameStatus: nextGameStatus });
    }
  };

  return (
    <div style={style}>
      {words.map((word) => {
        return <SpyCard key={word.id} word={word} teamId={word.teamId} />;
      })}

      {/* is team 1 spy's turn and player is team1spymaster */}
      {gameStatus === 'team1SpyTurn' && teamOneSpymasterId[0] === playerId && (
        <Button variant="contained" onClick={submitClue}>
          submit clue
        </Button>
      )}

      {/* is team 2 spy's turn and player is team2spymaster */}
      {gameStatus === 'team2SpyTurn' && teamTwoSpymasterId[0] === playerId && (
        <Button variant="contained" onClick={submitClue}>
          submit clue
        </Button>
      )}
    </div>
  );
};

export default SpyMasterBoard;
