import React from 'react';
import { useSelector } from 'react-redux';

const AllPlayers = () => {
  const { allPlayers } = useSelector((state) => state.allPlayers);

  return (
    <div>
      Players:
      {allPlayers?.map((player) => (
        <p key={player.playerId}>{player.username}</p>
      ))}
    </div>
  );
};

export default AllPlayers;
