import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playerId: "",
  username: "",
  roomId: "",
  isHost: false,
};

export const playerSlice = createSlice({
  name: "player",
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
    setIsHost: (state, action) => {
      state.isHost = action.payload;
    },
  },
});

export const { setUsername, setRoomId, setPlayerId, setIsHost } =
  playerSlice.actions;
export default playerSlice.reducer;
