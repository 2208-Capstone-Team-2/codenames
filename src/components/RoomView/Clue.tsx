import React, { useState } from 'react';
import { setCurrentClue } from '../../store/clueSlice';
import { useDispatch } from 'react-redux';
import { database } from '../../utils/firebase';
import { ref, child, push, update } from 'firebase/database';
import { useSelector } from 'react-redux';
import pluralize from 'pluralize';
import { Button } from '@mui/material';
interface ClueType {
  clueString: string;
  clueNumber: number;
  }
  
const Clue:React.FC<ClueType> = () => {
  const [clueString, setClueString] = useState<string>('');
  const [clueNumber, setClueNumber] = useState<number | null>(null);
  const playerId = useSelector((state:any) => state.player.playerId);
  const roomId = useSelector((state:any) => state.player.roomId);
  const gameStatus = useSelector((state:any) => state.game.status);
  const { teamOneSpymaster } = useSelector((state:any) => state.teamOne);
  const { teamTwoSpymaster } = useSelector((state:any) => state.teamTwo);
  const gameboard = useSelector((state:any) => state.wordsInGame.wordsInGame);
  let gameRef = ref(database, 'rooms/' + roomId + '/game/');
  let gameHistoryRef=ref(database, `rooms/${roomId}/game/history`);
  let arrayToCheck:string[] = [];
  //push all words in gameboard into an array
  for (let i = 0; i < gameboard.length; i++) {
    arrayToCheck.push(gameboard[i].wordString.toUpperCase());
  }
  let cluesRef = ref(database, 'rooms/' + roomId + '/clues/');

  const dispatch = useDispatch();

  const handleClueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //trim any extra space so users cannot submit "   clue" or '    ',
    //then convert all to uppercase to avoid case sensitive issue
    setClueString(event.target.value.trim().toUpperCase());
  };

  //please also help me rephrase all these alert messages
  const handleNumberChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setClueNumber(Number(event.target.value));
  };
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const regex = /[\s-]+/g;
    if (clueString === '') {
      return alert('you have to enter a clue');
    }
    //then convert all to singular so users cannot use 'apples' or 'feet' to indicate 'apple','foot'
    //not sure how accurate .singular() is tho
    else if (arrayToCheck.includes(clueString) || arrayToCheck.includes(pluralize.singular(clueString))) {
      return alert('this word is already on the gameboard, you cannot use it as your clue');
    }
    //here we make rules to only allow compound word that is a union of 3(and less) words so people won't type a whole sentence,
    // i.e "New York" or 'mother-in-law'
    else if (clueString.match(regex) && (clueString.match(regex)?.length || 0) > 2) {
      return alert('you can only use a compound word that is made of less than 3 words');
    }
    //this is to prevent users from submitting 'select a number'
    // either null(when user not selecting this at all) or select 'select a number'
    //clueNumber>0 will return false
    else if (!clueNumber || clueNumber <= 0) {
      return alert('please select a valid number');
    } else {
      const clueData = {
        clueString,
        clueNumber,
        playerSubmitting: playerId,
      };
      const newClueKey = push(child(ref(database), 'clues')).key;
      if (newClueKey) {
        const updates = {}as { [key: string]: any };
        updates[newClueKey] = clueData;
        dispatch(setCurrentClue(clueData));
        update(gameHistoryRef, updates);
      } else {
        console.error("newClueKey is null or undefined");
      }

      // store the clue in clueHistory and as current clue
      // will have for ex: {teamSubmittingClue: 1, clue: string, numOfGuesses: 3}
      let nextGameStatus:string;
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

  return (
    <div className="MessageInput">
      <form>
        {gameStatus === 'team1SpyTurn' && teamOneSpymaster[0]?.playerId === playerId && (
          <>
            <input
              type="text"
              placeholder="Clue..."
              onChange={(e) => {
                handleClueChange(e);
              }}
            />
            <select
              onChange={(e) => {
                handleNumberChange(e);
              }}
            >
              <option>select a number</option>
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
          </>
        )}
        {gameStatus === 'team2SpyTurn' && teamTwoSpymaster[0]?.playerId === playerId && (
          <>
            <input
              type="text"
              placeholder="Clue..."
              onChange={(e) => {
                handleClueChange(e);
              }}
            />
            <select
              onChange={(e) => {
                handleNumberChange(e);
              }}
            >
              <option>select a number</option>
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
          </>
        )}
        {/* is team 1 spy's turn and player is team1spymaster */}
        {gameStatus === 'team1SpyTurn' && teamOneSpymaster[0]?.playerId === playerId && (
          <button onClick={handleSubmit}>
            submit clue
          </button>
        )}

        {/* is team 2 spy's turn and player is team2spymaster */}
        {gameStatus === 'team2SpyTurn' && teamTwoSpymaster[0]?.playerId === playerId && (
          <Button variant="contained" onClick={handleSubmit}>
            submit clue
          </Button>
        )}
      </form>
    </div>
  );
};

export default Clue;