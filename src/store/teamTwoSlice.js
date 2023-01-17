import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teamTwoOperatives: [],
  teamTwoSpymaster: [],
};

export const teamTwoSlice = createSlice({
  name: "teamTwo",
  initialState,
  reducers: {
    setTeamTwoOperatives: (state, action) => {
      state.teamTwoOperatives = action.payload;
    },
    setTeamTwoSpymaster: (state, action) => {
      state.teamTwoSpymaster = action.payload;
    },
  },
});

export const { setTeamTwoOperatives, setTeamTwoSpymaster } =
  teamTwoSlice.actions;
export default teamTwoSlice.reducer;
