import React from "react";
import Card from "./Card.jsx";
import { useSelector } from "react-redux";

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
   <div key={singleWord.id}>

            <Card singleWord={singleWord} />
  {/* maybe set this to visible after players select it?  */}
<div style={{display:"none"}}>card result</div>
</div>
        );
      })}
    </div>
  );
};

export default Board;
