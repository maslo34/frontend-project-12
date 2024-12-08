import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messageAdapter = createEntityAdapter();

const initialState = messageAdapter.getInitialState();

const slice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addMessage: messageAdapter.addMany,
  },
});

export const { addMessage } = slice.actions;

export const selectors = messageAdapter.getSelectors((state) => state.message);

export default slice.reducer;
