import { width } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { isEveryRoleFilled } from '../../utils/utilFunctions';
import { RootState } from '../../store';
import { PlayerType } from '../../utils/interfaces';

const AllPlayers = () => {
  const { allPlayers } = useSelector((state: RootState) => state.allPlayers);
  const { teamOneOperatives, teamOneSpymaster } = useSelector((state: RootState) => state.teamOne);
  const { teamTwoOperatives, teamTwoSpymaster } = useSelector((state: RootState) => state.teamTwo);

  const everyonesHere: boolean = isEveryRoleFilled(teamOneOperatives, teamTwoOperatives, teamOneSpymaster, teamTwoSpymaster);

  return (
    <div className="welcomeBoardItem">
    
        Players:
        {allPlayers?.map((player:PlayerType) => {
         return <p key={player.playerId}>{player.username}</p>
        })}
    
      {!everyonesHere && (
        <p style={{ color: '#8c2a2a', textDecoration: 'underline' }}>
          Make sure there is at least one person in each role!
        </p>
      )}
    </div>
  );
};

export default AllPlayers;
