import React from 'react';
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
  return (
    <div>
      {dummyData.map((player) => {
        return <div></div>;
      })}
    </div>
  );
};

export default Leaderboard;
