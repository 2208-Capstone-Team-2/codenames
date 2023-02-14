import React from 'react';
import { useSelector } from 'react-redux';
import { isEveryRoleFilled } from '../../utils/utilFunctions';
import { RootState } from '../../store';
import { PlayerType } from '../../utils/interfaces';
import './allPlayers.css'
const AllPlayersNav = () => {
  const { allPlayers } = useSelector((state: RootState) => state.allPlayers);
  const { teamOneOperatives, teamOneSpymaster } = useSelector((state: RootState) => state.teamOne);
  const { teamTwoOperatives, teamTwoSpymaster } = useSelector((state: RootState) => state.teamTwo);

  const everyonesHere: boolean = isEveryRoleFilled(
    teamOneOperatives,
    teamTwoOperatives,
    teamOneSpymaster,
    teamTwoSpymaster,
  );

  return (
    <div className="playersInRoom">
      {allPlayers?.map((player: PlayerType) => (
        <p key={player.playerId}>{player.username}</p>
      ))}
    </div>
  );
};

export default AllPlayersNav;
