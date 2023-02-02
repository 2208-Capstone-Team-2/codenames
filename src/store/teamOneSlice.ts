import { createSlice } from '@reduxjs/toolkit';

interface SimplePlayer {
  playerId: string;
  username: string;
}

interface InitialStateType {
  team1Id: null | number;
  // This also all allows for teamOneOperatives to be an empty array, too
  teamOneOperatives: SimplePlayer[];
  teamOneSpymaster: SimplePlayer | null;
}

const initialState: InitialStateType = {
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
