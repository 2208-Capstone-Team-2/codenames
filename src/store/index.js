/* 
Here is where you will configure the store 
*/

import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import allPlayersReducer from "./allPlayersSlice";
import wordsInGameReducer from "./wordsInGameSlice";
const store = configureStore({
  reducer: {
    player: playerReducer,
    allPlayers: allPlayersReducer,
    wordsInGame: wordsInGameSliceReducer,
  },
});

export default store;
