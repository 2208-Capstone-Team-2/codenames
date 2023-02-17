import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import './roomView.css';
import { RootState } from '../../store';

const GameLog: React.FC = () => {
  const divRef = useRef<null | HTMLDivElement>(null);
  const gameHistory = useSelector((state: RootState) => state.game.gameHistory);
  const team1 = useSelector((state: RootState) => state.teamOne);
  const team2 = useSelector((state: RootState) => state.teamTwo);
  // here we are comparing if the teamSubmitted(which is the teamId, a number) in singleHistory===teamOne.team1Id
  // previously we have playerSubmitted in Cluetype,
  // but if we compare playerSubmitted(which is the spymaster's playerId) and teamOne.teamOneSpymaster.playerId
  // when the spymaster left the room, the playerId will be ''
  // and the game log will disappear because the logic will be false
  useEffect(() => {
    if (divRef.current)
      divRef.current.scroll({
        top: divRef.current.scrollHeight,
        behavior: 'smooth',
      });
  }, [gameHistory]);
  return (
    <div className="gameLogGridcell">
      <div className="gameLog">
        <h3 className="gameHistoryTitle">Game History</h3>
        <div className="scrollContent" ref={divRef}>
          {gameHistory.map((singleHistory, index) => {
            if (typeof singleHistory === 'object' && singleHistory.clueNumber != null) {
              if (team1.team1Id === singleHistory.teamSubmitted)
                return (
                  <p key={index}>
                    team 1's clue is {singleHistory.clueString} and their operators have {singleHistory.clueNumber + 1}{' '}
                    guess(es)
                  </p>
                );
              if (team2.team2Id === singleHistory.teamSubmitted)
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
    </div>
  );
};

export default GameLog;
