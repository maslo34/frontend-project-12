import { configureStore } from '@reduxjs/toolkit';

import authUserReducer from './authUserSlice.js';
import { messageApi } from './newMessagesSlice.js';
import { chanelApi } from './newChanelSlice.js';
import modalReducer from './modalSlice.js';
import actualChanelReducer from './actualChanelSlice.js'

// const logger = (store) => (next) => (action) => {
//   console.log('dispatching', action);
//   let result = next(action);
//   console.log('next state', store.getState());
//   return result;
// };

export default configureStore({
  reducer: {
    auth: authUserReducer,
    modal: modalReducer,
    actualChanelId: actualChanelReducer,
    [messageApi.reducerPath]: messageApi.reducer,
    [chanelApi.reducerPath]: chanelApi.reducer,
    
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([ messageApi.middleware, chanelApi.middleware]),
});
