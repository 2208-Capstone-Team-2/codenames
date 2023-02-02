//TODO!!!!!!!!

import { createSlice } from '@reduxjs/toolkit';

//const initialStateType: {};

const initialState = {
  assassinTeamId: [],
  bystanderTeamId: [],
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
