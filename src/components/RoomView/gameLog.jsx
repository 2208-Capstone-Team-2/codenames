import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
const GameLog = () => {
  // eslint-disable-next-line no-unused-vars
  let gameHistory = useSelector((state) => state.game.gameHistory);
  let gameStatus = useSelector((state) => state.game.status);
  {console.log(gameHistory)}
  return (
    <div>
      <h3>Game Status</h3>
      <div>{gameStatus}</div>
      <h3>Game History</h3>
      {gameHistory.map((singleHistory, index) => {
        if (typeof singleHistory === 'object')
          return (
            <p key={index}>
              The clue is {singleHistory.clueString} and you have {singleHistory.clueNumber} guess(es)
            </p>
          );
        else {
          return <p key={index}>{singleHistory}</p>;
        }
      })}
    </div>
  );
};

export default GameLog;
