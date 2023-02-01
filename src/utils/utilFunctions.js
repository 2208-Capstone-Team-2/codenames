export const isEveryRoleFilled = (teamOneOperatives, teamTwoOperatives, teamOneSpymaster, teamTwoSpymaster) => {
  if (
    teamOneOperatives.length > 0 &&
    teamTwoOperatives.length > 0 &&
    teamOneSpymaster.length > 0 &&
    teamTwoSpymaster.length > 0
  ) {
    return true;
  }
  return false;
};
