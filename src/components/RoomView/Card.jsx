import React from "react";

const Card = (singleWord) => {
  const style = {
    width: "120px",
    height: "150px",
    backgroundColor: "beige",
    textAlign: "center",
    alignContent: "center",
    display: "grid",
  };

  return <div style={style}>{singleWord.singleWord.word}</div>;
};

export default Card;
