import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './leaderboard.css';
const Leaderboard = () => {
  const [allPlayers, setAllPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const getPlayers = async () => {
    setLoading(true);
    // Grabbing players from the backend, later we could make this a little different
    //--- Maybe we wouldn't want to get players who have 0 wins, or you have to gave a certain number
    //--- of wins to be on the leaderboard?
    const { data } = await axios.get('/api/player/allPlayers');
    // Sort in place based on wins, then set it to local state, although this can later be redux state
    data.sort((a, b) => b.wins - a.wins);
    setAllPlayers(data);
    setLoading(false);
  };
  useEffect(() => {
    getPlayers();
  }, []);
  if (loading) return 'Loading...';
  return (
    <div>
      LEADERBOARD
      <table>
        <thead>
          <tr>
            <td>Username</td>
            <td>Wins</td>
          </tr>
        </thead>
        <tbody>
          {allPlayers.map((player, index) => (
            <tr key={index}>
              <td>{player.username}</td>
              <td>{player.wins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
