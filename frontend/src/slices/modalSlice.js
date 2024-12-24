import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modal',
  initialState: { isShow: false },
  reducers: {
    setOptionModal: (state, { payload }) => {
      state.isShow = payload.isShow;
      state.type = payload.type;
      state.id = payload.id;
      state.initialValue = payload.initialValue;
      state.toastMessage = payload.toastMessage;
    },
  },
});

export const { setOptionModal } = slice.actions;

export default slice.reducer;