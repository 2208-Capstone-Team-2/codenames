import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './leaderboard.css';
const Leaderboard = () => {
  // eslint-disable-next-line no-unused-vars
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
    <div className="leaderboardContainer">
      <div className="header">
        <h1>LEADERBOARD</h1>
      </div>
    </div>
  );
};

export default Leaderboard;
