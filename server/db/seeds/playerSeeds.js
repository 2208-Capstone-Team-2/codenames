const { Player } = require('../index');

const playerSeed = async () => {
  const dummyData = [
    {
      id: 1,
      username: 'Ben',
      wins: 112,
    },
    {
      id: 2,
      username: 'Louis',
      wins: 52,
    },
    {
      id: 3,
      username: 'Rue',
      wins: 56,
    },
    {
      id: 4,
      username: 'Abby',
      wins: 56,
    },
    {
      id: 5,
      username: 'Karat',
      wins: 72,
    },
    {
      id: 6,
      username: 'Steve',
      wins: 6,
    },
    {
      id: 7,
      username: 'Kolby',
      wins: 1,
    },
    {
      id: 8,
      username: 'Rose',
      wins: 56,
    },
    {
      id: 9,
      username: 'Olivia',
      wins: 72,
    },
    {
      id: 10,
      username: 'Heidi',
      wins: 156,
    },
    {
      id: 11,
      username: 'Topher',
      wins: 80,
    },
    {
      id: 12,
      username: 'Jacob',
      wins: 12,
    },
    {
      id: 13,
      username: 'John',
      wins: 5,
    },
    {
      id: 14,
      username: 'Maria',
      wins: 1,
    },
    {
      id: 15,
      username: 'Tom',
      wins: 19,
    },
  ];
  await Promise.all(dummyData.map((player) => Player.create(player)));
  console.log('DONE SEEDING PLAYERS..');
};

module.exports = playerSeed;
