import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../fitur/AuthSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer
    
  },
});
