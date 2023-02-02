import { createSlice } from '@reduxjs/toolkit';

interface singleHistoryType {
  clueString: string;
  clueNumber: number;
}

// This should be used instead of singleHistoryType, no?
interface clueType {
  clueString: string;
  clueNumber: number;
  playerSubmitting: string; // this is the player's ID (which is a string)
}

interface initialStateType {
  status: string;
  team1RemainingCards: number;
  team2RemainingCards: number;
  showResetButton: boolean;
  guessesRemaining: number;
  winner: string;
  loser: string;
  gameHistory: (string | singleHistoryType)[];
}

const initialState: initialStateType = {
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
