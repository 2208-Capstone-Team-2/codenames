import { width } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { isEveryRoleFilled } from '../../utils/utilFunctions';
const AllPlayers = () => {
  const { allPlayers } = useSelector((state) => state.allPlayers);
  const { teamOneOperatives, teamOneSpymaster } = useSelector((state) => state.teamOne);
  const { teamTwoOperatives, teamTwoSpymaster } = useSelector((state) => state.teamTwo);

  const everyonesHere = isEveryRoleFilled(teamOneOperatives, teamTwoOperatives, teamOneSpymaster, teamTwoSpymaster);
  return (
    <div className="welcomeBoardItem">
      <p>
        Players:
        {allPlayers?.map((player) => {
          return ' ' + player.username;
        })}
      </p>
      {!everyonesHere && (
        <p style={{ color: '#8c2a2a', textDecoration: 'underline' }}>
          Make sure there is at least one person in each role!
        </p>
      )}
    </div>
  );
};

export default AllPlayers;
