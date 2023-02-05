import { RootState } from '../store';

export const isEveryRoleFilled = (
  teamOneOperatives: any,
  teamTwoOperatives: any,
  teamOneSpymaster: any,
  teamTwoSpymaster: any,
) => {
  if (teamOneOperatives.length > 0 && teamTwoOperatives.length > 0 && teamOneSpymaster && teamTwoSpymaster) {
    return true;
  }
  return false;
};
