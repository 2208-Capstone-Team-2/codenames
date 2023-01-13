/* 
Here is where you will configure the store 
*/

import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import allPlayersReducer from "./allPlayersSlice";

const store = configureStore({
  reducer: {
    player: playerReducer,
    allPlayers: allPlayersReducer,
  },
});

export default store;
