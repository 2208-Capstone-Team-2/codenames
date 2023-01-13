import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playerId: "",
  username: "",
  roomId: "",
};

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setPlayerId: (state, action) => {
      state.playerId = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
  },
});

export const { setUsername, setRoomId, setPlayerId } = playersSlice.actions;
export default playersSlice.reducer;
