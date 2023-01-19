import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setWordsInGame } from "../../store/wordsInGameSlice";
import Grid from "@mui/material/Grid";


const Card = ({singleWord, value, submitAnswer}) => {
  const words = useSelector((state) => state.wordsInGame);
  const style = {
    width:"120px",
    height:"150px",
    backgroundColor:"beige",
    textAlign:"center",
    alignContent:"center",
    display:"grid"
  };


 

  return <button style={style} value={value} onClick={submitAnswer}>{singleWord.word}</button>;
};

export default Card;
