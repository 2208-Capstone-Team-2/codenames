import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  team1RemainingCards: 9,
  team2RemainingCards: 8,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setTeam1RemainingCards: (state, action) => {
      state.team1RemainingCards = action.payload;
    },
    setTeam2RemainingCards: (state, action) => {
      state.team2RemainingCards = action.payload;
    },
  },
});

export const { setStatus, setTeam1RemainingCards, setTeam2RemainingCards } =
  gameSlice.actions;
export default gameSlice.reducer;
