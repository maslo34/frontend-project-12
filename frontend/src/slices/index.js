import { configureStore } from "@reduxjs/toolkit";

import authUserReducer from './authUserSlice.js';
import chanelReducer from './chanelSlice.js';
import messageReducer from './messageSlice.js'

export default configureStore({
    reducer: {
        auth: authUserReducer,
        chanel: chanelReducer,
        message: messageReducer,
    }
})