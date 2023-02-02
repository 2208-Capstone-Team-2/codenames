import { createSlice } from '@reduxjs/toolkit';

interface SpyObj {
  playerId: string;
  username: string
}

interface initialStateType {
  team1Id: null | number;
  teamOneOperatives: [];
  teamOneSpymaster: SpyObj | null;
}

const initialState: initialStateType = {
  team1Id: null,
  teamOneOperatives: [],
  teamOneSpymaster: null,
};

export const teamOneSlice = createSlice({
  name: 'teamOne',
  initialState,
  reducers: {
    setTeam1Id: (state, action) => {
      state.team1Id = action.payload;
    },
    setTeamOneOperatives: (state, action) => {
      state.teamOneOperatives = action.payload;
    },
    setTeamOneSpymaster: (state, action) => {
      state.teamOneSpymaster = action.payload;
    },
  },
});

export const { setTeamOneOperatives, setTeamOneSpymaster, setTeam1Id } = teamOneSlice.actions;
export default teamOneSlice.reducer;
