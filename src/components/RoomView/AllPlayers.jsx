import React from 'react';
import { useSelector } from 'react-redux';
import { isEveryRoleFilled } from '../../utils/Utils';
const AllPlayers = () => {
  const { allPlayers } = useSelector((state) => state.allPlayers);
  const { teamOneOperatives, teamOneSpymaster } = useSelector((state) => state.teamOne);
  const { teamTwoOperatives, teamTwoSpymaster } = useSelector((state) => state.teamTwo);

  const everyonesHere = isEveryRoleFilled(teamOneOperatives, teamTwoOperatives, teamOneSpymaster, teamTwoSpymaster);
  return (
    <div>
      Players:
      {allPlayers?.map((player) => (
        <p key={player.playerId}>{player.username}</p>
      ))}
      <div>
        {!everyonesHere && <p style={{ color: 'red' }}>Make sure there is at least one person in each role!</p>}
      </div>
    </div>
  );
};

export default AllPlayers;
