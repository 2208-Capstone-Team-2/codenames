import React, { useState } from 'react';
import { setCurrentClue } from '../../store/clueSlice';
import { useDispatch } from 'react-redux';
import { database } from '../../utils/firebase';
import { ref, child, push, update } from 'firebase/database';
import { useSelector } from 'react-redux';
import pluralize from 'pluralize';
import { Button } from '@mui/material';
const Clue = () => {
  const [clueString, setClueString] = useState('');
  const [clueNumber, setClueNumber] = useState(null);
  const playerId = useSelector((state) => state.player.playerId);
  const roomId = useSelector((state) => state.player.roomId);
  const gameStatus = useSelector((state) => state.game.status);
  const { teamOneSpymaster } = useSelector((state) => state.teamOne);
  const { teamTwoSpymaster } = useSelector((state) => state.teamTwo);
  let gameRef = ref(database, 'rooms/' + roomId + '/game/');
  //get all words in game
  const gameboard = useSelector((state) => state.wordsInGame.wordsInGame);
  let arrayToCheck = [];
  //push all words in gameboard into an array
  for (let i = 0; i < gameboard.length; i++) {
    arrayToCheck.push(gameboard[i].word.toUpperCase());
  }
  let cluesRef = ref(database, 'rooms/' + roomId + '/clues/');

  const dispatch = useDispatch();

  const handleClueChange = (event) => {
    //trim any extra space so users cannot submit "   clue" or '    ',
    //then convert all to uppercase to avoid case sensitive issue
    setClueString(event.target.value.trim().toUpperCase());
  };

  //please also help me rephrase all these alert messages
  const handleNumberChange = (event) => {
    setClueNumber(Number(event.target.value));
  };
  const handleSubmit = async (event) => {
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
    else if (clueString.match(regex) && clueString.match(regex).length > 2) {
      return alert('you can only use a compound word that is made of less than 3 words');
    }
    //this is to prevent users from submitting 'select a number'
    // either null(when user not selecting this at all) or select 'select a number'
    //clueNumber>0 will return false
    else if (!clueNumber > 0) {
      return alert('please select a valid number');
    } else {
      const clueData = {
        clueString,
        clueNumber,
        playerSubmitting: playerId,
      };
      const newClueKey = push(child(ref(database), 'clues')).key;

      const updates = {};
      updates[newClueKey] = clueData;

      dispatch(setCurrentClue(clueData));
      update(cluesRef, updates);
      console.log('submitting clue');
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
          <Button variant="contained" onClick={handleSubmit}>
            submit clue
          </Button>
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
