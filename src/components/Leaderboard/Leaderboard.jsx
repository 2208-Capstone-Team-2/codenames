import React from 'react';
import './leaderboard.css';
const dummyData = [
  {
    username: 'Ben',
    wins: 112,
  },
  {
    username: 'Louis',
    wins: 52,
  },
  {
    username: 'Rue',
    wins: 56,
  },
  {
    username: 'Abby',
    wins: 56,
  },
  {
    username: 'Karat',
    wins: 72,
  },
];
const Leaderboard = () => {
  dummyData.sort((a, b) => b.wins - a.wins);
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
          {dummyData.map((player, index) => (
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
