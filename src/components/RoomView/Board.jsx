import React from "react";
import Card from "./Card.jsx";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWordsInGame } from "../../store/wordsInGameSlice";
import { NoEncryption } from "@mui/icons-material";

const Board = () => {
  const words = useSelector((state) => state.wordsInGame);

  console.log(words.wordsInGame);
  const style = {
    display: "grid",
    gridTemplateColumns: "auto auto auto auto auto",
    marginTop: "5%",
    gap: "2%",
    justifyContent: "center",
    alightItems: "center",
  };


  const submitAnswer = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    // reveal card color
    // decrement from the cards remaining for the team the card belongs to
  
    // if the team clicks a correct card:
        // decrement 1 from their cardsRemaining
        // decrement from tthe clue number remaining
  
    // if the team clicks an incorrect card:
        // if its an assassin, end the game // setWinner, do other stuff
        // if its a bystander, endTurn()
        // if its other teams card, decrement from cards remaining, & endTurn()
  }

  return (
    <div style={style}>
      {words.wordsInGame.map((singleWord) => {
        return (
          <>
            <Card singleWord={singleWord} onClick={submitAnswer} value={singleWord.teamNumber}/>
            <div style={{ display: "none" }}>Reveal Team</div>
          </>
        );
      })}
    </div>
  );
};

export default Board;
