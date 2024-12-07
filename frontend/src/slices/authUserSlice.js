import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'auth',
  initialState: { username: null, token: null },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.token = payload.token;
      state.username = payload.username;
    },
  },
});

export const { setCredentials } = slice.actions;

export default slice.reducer;
