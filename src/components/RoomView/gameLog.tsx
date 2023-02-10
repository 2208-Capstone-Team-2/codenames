import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './roomView.css';
import { RootState } from '../../store';
import { useParams } from 'react-router-dom';
import { get, ref } from 'firebase/database';
import { database } from '../../utils/firebase';

const GameLog: React.FC = () => {
  const gameHistory = useSelector((state: RootState) => state.game.gameHistory);
  const team1Spymaster = useSelector((state: RootState) => state.teamOne.teamOneSpymaster);
  const team2Spymaster = useSelector((state: RootState) => state.teamTwo.teamTwoSpymaster);

  return (
    <div className="gameLog">
      <h3 className="gameHistoryTitle">Game History</h3>
      <div className="scrollContent">
        {gameHistory.map((singleHistory, index) => {
          if (typeof singleHistory === 'object' && singleHistory.clueNumber != null) {
            if (team1Spymaster?.playerId.includes(singleHistory.playerSubmitting))
              return (
                <p key={index}>
                  team 1's clue is {singleHistory.clueString} and their operators have {singleHistory.clueNumber + 1}{' '}
                  guess(es)
                </p>
              );
            if (team2Spymaster?.playerId.includes(singleHistory.playerSubmitting))
              return (
                <p key={index}>
                  team 2's clue is {singleHistory.clueString} and their operators have {singleHistory.clueNumber + 1}{' '}
                  guess(es)
                </p>
              );
          } else if (typeof singleHistory === 'string') {
            return <p key={index}>{singleHistory}</p>;
          }
        })}
      </div>
    </div>
  );
};

export default GameLog;
