import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const chanelAdapter = createEntityAdapter();

const initialState = chanelAdapter.getInitialState();

const slice = createSlice({
  name: 'chanel',
  initialState,
  reducers: {
    addChanel: chanelAdapter.addMany,
  },
});

export const { addChanel } = slice.actions;

export const selectors = chanelAdapter.getSelectors((state) => state.chanel)

export default slice.reducer;
