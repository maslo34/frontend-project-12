/*eslint no-param-reassign: ["error", { "props": false }]*/
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'actualChanelId',
  initialState: { chanelId: '1', name: 'general'},
  reducers: {
    actualChanelId: (state, { payload }) => {
      console.log(payload.chanelId)
      state.chanelId = payload.chanelId;
      state.name = payload.name;
    },
  },
});

export const { actualChanelId } = slice.actions;

export default slice.reducer;
