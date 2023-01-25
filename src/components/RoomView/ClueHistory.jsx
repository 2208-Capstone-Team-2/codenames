import React from 'react';
import { useSelector } from 'react-redux';

const ClueHistory = () => {
  const clueHistory = useSelector((state) => state.clues.clueHistory);

  return (
    <div>
      <h3>Game History</h3>
      {clueHistory.map((singleClue, index) => {
        return (
          <p key={index}>
            The clue is {singleClue.clueString} and you have {singleClue.clueNumber} guess(es)
          </p>
        );
      })}
    </div>
  );
};

export default ClueHistory;
