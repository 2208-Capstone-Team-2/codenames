import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  assassinTeamId: null | number;
  bystanderTeamId: null | number;
}

const initialState: InitialState = {
  // previously these were both emptry arrays?
  assassinTeamId: null,
  bystanderTeamId: null,
};

export const assassinAndBystanderSlice = createSlice({
  name: 'assassinAndBystander',
  initialState,
  reducers: {
    setAssassinTeamId: (state, action) => {
      state.assassinTeamId = action.payload;
    },
    setBystanderTeamId: (state, action) => {
      state.bystanderTeamId = action.payload;
    },
  },
});

export const { setAssassinTeamId, setBystanderTeamId } = assassinAndBystanderSlice.actions;
export default assassinAndBystanderSlice.reducer;
