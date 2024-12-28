/* eslint no-param-reassign: ["error", { "props": false }] */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modal',
  initialState: { isShow: false },
  reducers: {
    openModal: (state, { payload }) => {
      state.isShow = payload.isShow;
      state.type = payload.type;
      state.id = payload.id;
      state.initialValue = payload.initialValue;
      state.toastMessage = payload.toastMessage;
    },
    closeModal: (state) => {
      state.isShow = false;
      state.type = null;
      state.id = null;
      state.initialValue = null;
      state.toastMessage = null;
    },
  },
});

export const { openModal, closeModal } = slice.actions;

export default slice.reducer;
