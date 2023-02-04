import React from 'react';
import { useSelector } from 'react-redux';
import { isEveryRoleFilled } from '../../utils/utilFunctions';
import { RootState } from '../../store';
import { PlayerType } from '../../utils/interfaces';

const AllPlayers = () => {
  const { allPlayers } = useSelector((state: RootState) => state.allPlayers);
  const { teamOneOperatives, teamOneSpymaster } = useSelector((state: RootState) => state.teamOne);
  const { teamTwoOperatives, teamTwoSpymaster } = useSelector((state: RootState) => state.teamTwo);

  const everyonesHere = isEveryRoleFilled(teamOneOperatives, teamTwoOperatives, teamOneSpymaster, teamTwoSpymaster);

  return (
    <div>
      Players:
      {allPlayers?.map((player: PlayerType) => (
        <p key={player.playerId}>{player.username}</p>
      ))}
      <div>
        {!everyonesHere && <p style={{ color: 'red' }}>Make sure there is at least one person in each role!</p>}
      </div>
    </div>
  );
};

export default AllPlayers;
