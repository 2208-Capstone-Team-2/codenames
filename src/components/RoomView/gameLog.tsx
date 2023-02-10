import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './roomView.css';
import { RootState } from '../../store';
import { useParams } from 'react-router-dom';
import { get, ref } from 'firebase/database';
import { database } from '../../utils/firebase';

const GameLog: React.FC = () => {
  const gameHistory = useSelector((state: RootState) => state.game.gameHistory);
  const team1 = useSelector((state: RootState) => state.teamOne);
  const team2 = useSelector((state: RootState) => state.teamTwo);

  //known issue, if all team member left the room,
  //their clue history will disappear
  //because state.teamOne/state.teamTwo will be null
  //I'm not sure how to solve this with our current setting
  //but feel this is not a priority since irl if all players left
  //the game is probably over anyway
  return (
    <div className="gameLog">
      <h3 className="gameHistoryTitle">Game History</h3>
      <div className="scrollContent">
        {gameHistory.map((singleHistory, index) => {
          if (typeof singleHistory === 'object' && singleHistory.clueNumber != null) {
            if (team1.teamOneSpymaster?.playerId !== singleHistory.playerSubmitting)
              return (
                <p key={index}>
                  team 2's clue is {singleHistory.clueString} and their operators have {singleHistory.clueNumber + 1}{' '}
                  guess(es)
                </p>
              );
            if (team2.teamTwoSpymaster?.playerId !== singleHistory.playerSubmitting)
              return (
                <p key={index}>
                  team 1's clue is {singleHistory.clueString} and their operators have {singleHistory.clueNumber + 1}{' '}
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
