/**
 * @param {} quantity
 * @param {*} max
 * @returns an array of length 'length', made up of randomly chosen elements from arrayOfIds
 */
function getRandomIntArray(length: number, arrayOfIds: number[]) {
  const arr: number[] = [];
  while (arr.length < length) {
    const randIndex = Math.floor(Math.random() * arrayOfIds.length);
    const element = arrayOfIds[randIndex];
    // Only push this onto the arr if the arr doesn't include that number already.
    if (!arr.includes(element)) arr.push(element);
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
function createRandomLayout(team1id: number, team2id: number, team3id: number, team4id: number) {
  // This JavaScript function always returns a random number between min and max (both included):
  function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let team1Pile = 9; // 9 '1' --> red card
  let team2Pile = 8; // 8 '2' --> blue card
  let team3Pile = 7; // 7 '3' --> white card
  let team4Pile = 1; // 1 '0' --> black card
  interface TeamHash {
    [key: number]: number;
    1: number;
    2: number;
    3: number;
    4: number;
  }
  const mapping: TeamHash = {
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

export default { getRandomIntArray, createRandomLayout };
