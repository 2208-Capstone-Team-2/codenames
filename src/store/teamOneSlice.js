import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teamOneOperatives: [],
  teamOneSpymaster: [],
};

export const teamOneSlice = createSlice({
  name: "teamOne",
  initialState,
  reducers: {
    setTeamOneOperatives: (state, action) => {
      state.teamOneOperatives = action.payload;
    },
    setTeamOneSpymaster: (state, action) => {
      state.teamOneSpymaster = action.payload;
    },
  },
});

export const { setTeamOneOperatives, setTeamOneSpymaster } =
  teamOneSlice.actions;
export default teamOneSlice.reducer;
