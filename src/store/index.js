import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import allPlayersReducer from "./allPlayersSlice";
import wordsInGameReducer from "./wordsInGameSlice";
import teamOneReducer from "./teamOneSlice";
import teamTwoReducer from "./teamTwoSlice";
import clueReducer from "./clueSlice";

const store = configureStore({
  reducer: {
    player: playerReducer,
    allPlayers: allPlayersReducer,
    wordsInGame: wordsInGameReducer,
    teamOne: teamOneReducer,
    teamTwo: teamTwoReducer,
    clues: clueReducer,
  },
});

export default store;
