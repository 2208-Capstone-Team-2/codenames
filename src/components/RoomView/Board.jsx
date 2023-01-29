import React from "react";
import Card from "./Card.jsx";
import { useDispatch, useSelector } from "react-redux";


const Board = () => {
  const words = useSelector((state) => state.wordsInGame);
  const style = {
    display: "grid",
    gridTemplateColumns: "auto auto auto auto auto",
    marginTop: "5%",
    gap: "2%",
    justifyContent: "center",
    alightItems: "center",
  };
  return (
    <div style={style}>
      {words.wordsInGame.map((singleWord) => {
        return (
          <>
            <Card singleWord={singleWord} />
            <div style={{ display: "none" }}>Reveal Team</div>
          </>
        );
      })}
    </div>
  );
};

export default Board;
