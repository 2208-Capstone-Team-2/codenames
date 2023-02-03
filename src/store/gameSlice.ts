import { createSlice } from '@reduxjs/toolkit';
import { ClueType } from '../utils/interfaces';

// move this to interfaces.ts ?
interface GameType {
  status: string;
  team1RemainingCards: number;
  team2RemainingCards: number;
  showResetButton: boolean;
  guessesRemaining: number;
  winner: string;
  loser: string;
  gameHistory: (string | ClueType)[];
  // eventually want this:
  // gameHistory: (string | ClueType)[];
}

// gameHistory: [clueObj,  clueObj ] ...?
const initialState: GameType = {
  status: 'ready',
  team1RemainingCards: 9,
  team2RemainingCards: 8,
  showResetButton: false,
  guessesRemaining: 0,
  winner: '',
  loser: '',
  gameHistory: [],
};

export const gameSlice = createSlice({
  name: 'game',
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

    setGameHistory: (state, action) => {
      state.gameHistory = action.payload;
    },

    setShowResetButton: (state, action) => {
      state.showResetButton = action.payload;
    },
    setGuessesRemaining: (state, action) => {
      state.guessesRemaining = action.payload;
    },
    setWinner: (state, action) => {
      state.winner = action.payload;
    },
    setLoser: (state, action) => {
      state.loser = action.payload;
    },
  },
});

export const {
  setStatus,
  setTeam1RemainingCards,
  setTeam2RemainingCards,
  setShowResetButton,
  setGuessesRemaining,
  setWinner,
  setLoser,
  setGameHistory,
} = gameSlice.actions;
export default gameSlice.reducer;
