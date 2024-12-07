import { configureStore } from "@reduxjs/toolkit";

import authUserReducer from './authUserSlice.js';

export default configureStore({
    reducer: {
        auth: authUserReducer,
    }
})