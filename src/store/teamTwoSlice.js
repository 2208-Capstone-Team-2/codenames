import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  team2Id: null,
  teamTwoOperatives: [],
  teamTwoSpymaster: [],
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
