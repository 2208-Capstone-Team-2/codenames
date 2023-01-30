/**
 *
 * @param {} quantity
 * @param {*} max
 * @returns an array of integers
 */
//a function to get "quantity" of unique random interger, from 0 - max (inclusive)
function getRandomIntArray(quantity, max) {
  const arr = [];
  while (arr.length < quantity) {
    let candidateInt = Math.floor(Math.random() * (max + 1));
    if (candidateInt === 0) continue; // Quickfix to not let 0 get pushed on
    // Only push onto the arr if the arr doesn't include that number already.
    if (arr.indexOf(candidateInt) === -1) arr.push(candidateInt);
  }
  return arr;
}

/**
 *  Creates an array of 25 elements that are teamIds.
team1's id appears 9 times
team2's id appears 8 times.
team3's id appears 7 times
team4's id appears once.
The order of these apperances are random
 * @param {*} team1id 
 * @param {*} team2id 
 * @param {*} team3id 
 * @param {*} team4id 
 * @returns 
 */
function createRandomLayout(team1id, team2id, team3id, team4id) {
  // This JavaScript function always returns a random number between min and max (both included):
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let team1Pile = 9; // 9 '1' --> red card
  let team2Pile = 8; // 8 '2' --> blue card
  let team3Pile = 7; // 7 '3' --> white card
  let team4Pile = 1; // 1 '0' --> black card

  const mapping = {
    1: team1id,
    2: team2id,
    3: team3id,
    4: team4id,
  };

  let randomLayout = [];
  while (randomLayout.length < 25) {
    // get a int from 1, 2, 3, 4
    const randomInt = getRndInteger(1, 4);
    // Make sure that the pile isn't empty!
    if (mapping[randomInt] === team1id && team1Pile > 0) {
      team1Pile--;
      randomLayout.push(team1id);
    }
    if (mapping[randomInt] === team2id && team2Pile > 0) {
      team2Pile--;
      randomLayout.push(team2id);
    }
    if (mapping[randomInt] === team3id && team3Pile > 0) {
      team3Pile--;
      randomLayout.push(team3id);
    }
    if (mapping[randomInt] === team4id && team4Pile > 0) {
      team4Pile--;
      randomLayout.push(team4id);
    }
  }
  return randomLayout;
}

module.exports = { getRandomIntArray, createRandomLayout };
