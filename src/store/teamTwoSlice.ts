import { createSlice } from '@reduxjs/toolkit';

interface SimplePlayer {
  playerId: string;
  username: string;
}
interface InitialStateType {
  team2Id: null | number;
  teamTwoOperatives: SimplePlayer[];
  teamTwoSpymaster: SimplePlayer | null;
}

const initialState: InitialStateType = {
  team2Id: null,
  teamTwoOperatives: [],
  teamTwoSpymaster: null,
};

export const teamTwoSlice = createSlice({
  name: 'teamTwo',
  initialState,
  reducers: {
    setTeam2Id: (state, action) => {
      state.team2Id = action.payload;
    },
    setTeamTwoOperatives: (state, action) => {
      state.teamTwoOperatives = action.payload;
    },
    setTeamTwoSpymaster: (state, action) => {
      state.teamTwoSpymaster = action.payload;
    },
  },
});

export const { setTeamTwoOperatives, setTeamTwoSpymaster, setTeam2Id } = teamTwoSlice.actions;
export default teamTwoSlice.reducer;
