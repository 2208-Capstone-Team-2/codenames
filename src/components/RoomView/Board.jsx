import React, { useEffect, useState } from "react";
import Card from "./Card.jsx";
import { useDispatch, useSelector } from "react-redux";
import { ref, update,onValue, get  } from "firebase/database";
import { database } from "../../utils/firebase";

import { setWordsInGame } from "../../store/wordsInGameSlice";
const Board = () => {
  const words = useSelector((state) => state.wordsInGame);
  let playerRef = ref(database, "players/" + playerId);
  const roomId = useSelector((state) => state.player.roomId);
  const playerId = useSelector((state) => state.player.playerId);
  let gameRef = ref(database, "rooms/" + roomId + "/game/");
  let gameStatusRef = ref(database, "rooms/" + roomId + "/game/gameStatus/");
  const teamOneOperativesRef = ref(database, `rooms/${roomId}/team-1/operatives/`);
  const teamTwoOperativesRef = ref(database, `rooms/${roomId}/team-2/operatives/`);

  const style = {
    display: "grid",
    gridTemplateColumns: "auto auto auto auto auto",
    marginTop: "5%",
    gap: "2%",
    justifyContent: "center",
    alightItems: "center",
  };

  const submitAnswer = async (e) => {
    e.preventDefault()
    let gameStatus;
    let teamOneOps;
    let teamTwoOps;
    
    // reveal card color

    // get game status -- whos turn is it?
    await get(gameRef).then((snapshot) => {
      gameStatus = snapshot.val().gameStatus})

    // get team one operatives data
    await get(teamOneOperativesRef).then((snapshot) => {
      if (snapshot.exists) {
        teamOneOps = snapshot.val()
      }
    })
    // get team two operatives data
    await get(teamTwoOperativesRef).then((snapshot) => {
      if (snapshot.exists) {
        teamTwoOps = snapshot.val()
      }
    })

  //  if its team 1 ops turn and they are the one who clicked on the card...
    if (gameStatus === 'team1OpsTurn' && Object.keys(teamOneOps).includes(playerId)) {
      console.log('im on team 1 - i submitted an answer bc it was my turn!')
        // reveal card
        // if it is correct guess?
            // decrement from cards remaining
            // if cards remaining === 0, endGame, setWinner
            // decrement from guesses remaining
            // if guesses remaining === 0, endTurn()
        // if it is incorrect guess?
            // is assassin? game over, set winner
            // is bystander ? endTurn()
            // is other teams card ? decrement from other teams cards remaining, endTurn()
      } else if (gameStatus === 'team2OpsTurn' && Object.keys(teamTwoOps).includes(playerId)) {
        console.log('im on team 2 - i submitted an answer bc it was my turn!')
        // reveal card
        // if it is correct guess?
            // decrement from cards remaining
            // if cards remaining === 0, endGame, setWinner
            // decrement from guesses remaining
            // if guesses remaining === 0, endTurn()
        // if it is incorrect guess?
            // is assassin? game over, set winner
            // is bystander ? endTurn()
            // is other teams card ? decrement from other teams cards remaining, endTurn()
      } else {
        console.log('its not my turn')
      }    
  }



  const dispatch=useDispatch()
  let cardsRef = ref(database, `rooms/${roomId}/gameboard`);
  // On load...
  useEffect(() => {
    // Look to see if there are cards already loaded for the room
    onValue(cardsRef, (snapshot) => {
      // If there are cards in /room/roomId/cards
      if (snapshot.exists()) {
        //update our redux to reflect that
        const cardsFromSnapshot = snapshot.val();
        const values = Object.values(cardsFromSnapshot);
        dispatch(setWordsInGame(values));
      }
    });
  }, []);
  return (
    <div style={style}>
      {words.wordsInGame.map((singleWord) => {
        return (
            <Card singleWord={singleWord} value={singleWord.teamNumber} submitAnswer={submitAnswer}/>
        );
      })}
    </div>
  );
};

export default Board;
