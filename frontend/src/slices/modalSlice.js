import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modal',
  initialState: { isShow: false, modalTitle: 'daw', initialValuesChanel: ''},
  reducers: {
    setOptionModal: (state, { payload }) => {
      state.isShow = payload.isShow;
      state.type = payload.type;
      state.id = payload.id;
      state.initialValue = payload.initialValue; 
    },
  },
});

export const { setOptionModal } = slice.actions;

export default slice.reducer;