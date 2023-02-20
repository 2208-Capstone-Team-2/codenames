import React, { useState } from 'react';
import pluralize from 'pluralize';
import { ClueType } from '../../../utils/interfaces'; // for Typescript interface
// firebase:
import { database } from '../../../utils/firebase';
import { ref, child, push, update, off, set } from 'firebase/database';
// redux:
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentClue } from '../../../store/clueSlice';
import { RootState } from '../../../store';
// CSS:
import './clue.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Clue = () => {
  // useStates:
  const [clueString, setClueString] = useState<string>('');
  const [clueNumber, setClueNumber] = useState<number | null>(null);

  // redux:
  const dispatch = useDispatch();
  const gameStatus = useSelector((state: RootState) => state.game.status);
  const { playerId, roomId, teamId } = useSelector((state: RootState) => state.player);
  const { teamOneSpymaster } = useSelector((state: RootState) => state.teamOne);
  const { teamTwoSpymaster } = useSelector((state: RootState) => state.teamTwo);
  const { wordsInGame } = useSelector((state: RootState) => state.wordsInGame);
  // firebase:
  const gameRef = ref(database, `rooms/${roomId}/game/`);
  const gameHistoryRef = ref(database, `rooms/${roomId}/game/history`);
  const cardsRef = ref(database, `rooms/${roomId}/gameboard`);
  const currentClueRef = ref(database, `rooms/${roomId}/game/currentClue`);

  // MUI Alert stuff
  const [open, setOpen] = React.useState<boolean>(false);
  const vertical = 'bottom';
  const horizontal = 'center';
  const [alertMessage, setAlertMessage] = React.useState<string>('');
  const handleOpen = (message: string) => {
    setAlertMessage(message);
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  //
  // This is an array of all the cards' words in play. It is used to make sure
  // that the spy does not give a clue that is one of these words.
  const arrayToCheck: string[] = [];
  for (let i = 0; i < wordsInGame.length; i++) {
    arrayToCheck.push(wordsInGame[i].wordString.toUpperCase());
  }

  const handleClueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // trim any extra space so users cannot submit "   clue" or '    ',
    // then convert all to uppercase to avoid case sensitive issue
    setClueString(event.target.value.trim().toUpperCase());
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setClueNumber(Number(event.target.value));
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    off(cardsRef);

    const regex = /[\s-]+/g;
    if (clueString === '') {
      handleOpen('Cannot give an empty clue');
    }
    // then convert all to singular so users cannot use 'apples' or 'feet' to indicate 'apple','foot'
    // not sure how accurate .singular() is tho
    else if (arrayToCheck.includes(clueString) || arrayToCheck.includes(pluralize.singular(clueString))) {
      handleOpen('Cannot give a clue that includes a word on the gameboard');
    }
    // here we make rules to only allow compound word that is a union of 3(and less) words so people won't type a whole sentence,
    // i.e "New York" or 'mother-in-law'
    else if (clueString.match(regex) && (clueString.match(regex)?.length || 0) > 2) {
      handleOpen('A clue can only be 3 words or less');
    }
    // this is to prevent users from submitting 'select a number'
    // either null(when user not selecting this at all) or select 'select a number'
    // clueNumber>0 will return false
    else if (!clueNumber || clueNumber <= 0) {
      handleOpen('Please select a valid number');
    } else {
      const clueData = {
        clueString,
        clueNumber,
        teamSubmitted: teamId, // change to teamSubmitted
      };
      const newClueKey = push(child(ref(database), 'clues')).key;
      if (newClueKey) {
        const updates = {} as { [key: string]: ClueType };
        updates[newClueKey] = clueData;
        dispatch(setCurrentClue(clueData));
        update(gameHistoryRef, updates);
        set(currentClueRef, clueData)
      } else {
        console.error('newClueKey is null or undefined');
      }

      // store the clue in clueHistory and as current clue
      // will have for ex: {teamSubmittingClue: 1, clue: string, numOfGuesses: 3}
      let nextGameStatus: string;
      // if its team1spy submission, team1Ops goes next
      if (gameStatus === 'team1SpyTurn') {
        nextGameStatus = 'team1OpsTurn';
        update(gameRef, { gameStatus: nextGameStatus, guessesRemaining: clueNumber + 1 });
      }
      // if its team2spy submission, team2Ops goes next
      if (gameStatus === 'team2SpyTurn') {
        nextGameStatus = 'team2OpsTurn';
        update(gameRef, { gameStatus: nextGameStatus, guessesRemaining: clueNumber + 1 });
      }
    }
  };

  // This is used to conditionally style - if they're red, they get red styling. Else, blue styling.
  const imRedSpy = teamOneSpymaster?.playerId === playerId;

  // Calculate here if we should show this component or not.
  /* Note: I do think this logic should be done outside the component and conditionally renders it there,
    rather than in here, and choosing to render a fragment instead, but for now... */
  let showClue = false; // start it with false
  const iAmSpy1AndItsMyTurn = gameStatus === 'team1SpyTurn' && teamOneSpymaster?.playerId === playerId;
  const iAmSpy2AndItsMyTurn = gameStatus === 'team2SpyTurn' && teamTwoSpymaster?.playerId === playerId;
  // If either of these above are true, show the Clue component!
  if (iAmSpy1AndItsMyTurn || iAmSpy2AndItsMyTurn) showClue = true;


  if (!showClue) return <></>;
  return (
    <div className="clueWrapper">
      <form className="clue-form" method="post">
        <input
          className={imRedSpy ? 'clue-input-text dark-red-color' : 'clue-input-text dark-blue-color'}
          type="text"
          placeholder="Type your clue here..."
          onChange={(e) => {
            handleClueChange(e);
          }}
        />
        <select
          className={imRedSpy ? 'clue-input-number dark-red-color' : 'clue-input-number dark-blue-color'}
          onChange={(e) => {
            handleNumberChange(e);
          }}
        >
          <option>#</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
        </select>
        <button
          className={
            imRedSpy ? 'clue-submit-button dark-red-background-color' : 'clue-submit-button dark-blue-background-color'
          }
          type={'submit'}
          onClick={handleSubmit}
          onKeyUp={(e) => {
            handleSubmit(e);
          }}
        >
          Submit Clue
        </button>
      </form>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Clue;
