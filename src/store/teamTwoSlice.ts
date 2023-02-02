import { createSlice } from '@reduxjs/toolkit';

interface SpyObj {
  playerId: string;
  username: string
}

interface initialStateType {
  team2Id: null | number;
  teamTwoOperatives: [];
  teamTwoSpymaster: SpyObj | null;
}

const initialState: initialStateType = {
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
