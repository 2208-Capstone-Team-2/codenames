export const isEveryRoleFilled = (teamOneOperatives, teamTwoOperatives, teamOneSpymaster, teamTwoSpymaster) => {
  if (teamOneOperatives.length > 0 && teamTwoOperatives.length > 0 && teamOneSpymaster && teamTwoSpymaster) {
    return true;
  }
  return false;
};
