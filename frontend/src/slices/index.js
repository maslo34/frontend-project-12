import { configureStore } from '@reduxjs/toolkit';

import authUserReducer from './authUserSlice.js';
import chanelReducer from './chanelSlice.js';
import messageReducer from './messageSlice.js';
import { messageApi } from './newMessagesSlice.js';

// const logger = (store) => (next) => (action) => {
//   console.log('dispatching', action);
//   let result = next(action);
//   console.log('next state', store.getState());
//   return result;
// };

export default configureStore({
  reducer: {
    auth: authUserReducer,
    chanel: chanelReducer,
    message: messageReducer,
    [messageApi.reducerPath]: messageApi.reducer,
    
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([ messageApi.middleware]),
});
