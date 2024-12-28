import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'auth',
  initialState: { username: null, token: null },
  reducers: {
    login: (state, { payload }) => {
      state.token = payload.token;
      state.username = payload.username;
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
    },
  },
});

export const { login, logout } = slice.actions;

export default slice.reducer;
